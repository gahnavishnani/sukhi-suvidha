from fastapi import FastAPI, File, UploadFile, Form, HTTPException
from fastapi.responses import JSONResponse, FileResponse
from fastapi.middleware.cors import CORSMiddleware
from gtts import gTTS
import os
import easyocr
import logging
from typing import Dict

# Set up logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Create directories if they don't exist
os.makedirs("uploads", exist_ok=True)
os.makedirs("audio/output", exist_ok=True)

# Initialize FastAPI app
app = FastAPI()

# Add CORS middleware to allow frontend connections
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Language configuration
LANGUAGE_CONFIG = {
    "en": {"easyocr": ["en"], "gtts": "en"},
    "hi": {"easyocr": ["hi"], "gtts": "hi"},
    "bn": {"easyocr": ["bn"], "gtts": "bn"},
    "te": {"easyocr": ["te"], "gtts": "te"},
    "mr": {"easyocr": ["mr"], "gtts": "mr"},
    "ta": {"easyocr": ["ta"], "gtts": "ta"},
}

# Store readers in a dictionary
readers: Dict[str, easyocr.Reader] = {}

def get_reader(language_code: str) -> easyocr.Reader:
    """Get or create an OCR reader for the specified language"""
    if language_code not in readers:
        if language_code not in LANGUAGE_CONFIG:
            raise ValueError(f"Unsupported language: {language_code}")
            
        logger.info(f"Initializing OCR reader for {language_code}...")
        readers[language_code] = easyocr.Reader(LANGUAGE_CONFIG[language_code]["easyocr"])
    
    return readers[language_code]

@app.post("/upload")
async def upload(uploadFile: UploadFile = File(...), language_code: str = Form(...)):
    if language_code not in LANGUAGE_CONFIG:
        raise HTTPException(status_code=400, detail="Invalid language code provided.")

    try:
        # Save uploaded file
        file_location = f"uploads/{uploadFile.filename}"
        with open(file_location, "wb") as f:
            content = await uploadFile.read()
            f.write(content)

        # Get the appropriate OCR reader
        reader = get_reader(language_code)
        
        # Perform OCR
        result = reader.readtext(file_location, detail=0)
        extracted_text = " ".join(result)
        logger.info(f"Extracted text: {extracted_text}")

        # Generate audio
        audio_filename = f"{uploadFile.filename.split('.')[0]}_{language_code}.mp3"
        audio_path = f"audio/output/{audio_filename}"
        
        tts = gTTS(
            text=extracted_text, 
            lang=LANGUAGE_CONFIG[language_code]["gtts"], 
            slow=False
        )
        tts.save(audio_path)

        # Clean up the uploaded file
        os.remove(file_location)

        return JSONResponse(content={
            "text": extracted_text,
            "audio_url": f"/audio/{audio_filename}"
        })
        
    except Exception as e:
        logger.error(f"Error processing request: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

# Endpoint to serve the audio files
@app.get("/audio/{filename}")
async def get_audio_file(filename: str):
    file_path = f"audio/output/{filename}"
    if not os.path.exists(file_path):
        raise HTTPException(status_code=404, detail="Audio file not found.")
    return FileResponse(file_path)

@app.get("/")
async def root():
    return {"message": "OCR Text Extraction and Audio Generation API"}

@app.get("/health")
async def health_check():
    return {"status": "healthy"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)