# Cek-Apel, Final Capstone Project

Cek-Apel is an app that detects diseases on apple leaves through scans or uploaded photos. The app provides detailed information on the type of disease as well as treatment recommendations to the user.

## Team ID : C242-PS023

## Team Members :
1. (MD) A128B4KY2370 – Made Dharmagiri – Politeknik Negeri Jakarta - [Active]
2. (MD) A128B4KY0292 – Akhtar Faizi Putra – Politeknik Negeri Jakarta - [Active]
3. (ML) M006B4KY0132 – Adrian Sanjaya – Universitas Brawijaya - [Active]
4. (ML) M128B4KX3181 – Nabila Aulya Fakhrunnisaa – Politeknik Negeri Jakarta - [Active]
5. (ML) M128B4KX3722 – Razita Nazla Febriani – Politeknik Negeri Jakarta - [Active]
6. (CC) C128B4KY1671 – Haidar Aditya Baran – Politeknik Negeri Jakarta - [Active]
7. (CC) C012B4KY2581 – Mohammad Salman Muntazar Dzulfiqar – Universitas Telkom - [Active]

Theme : Smart Agri-Fishery Solution: Agrotech and Fisheries Technology Integration

# Android Development Learning Path

## Steps To Clone Project
1. Clone this repository to your device
2. Open In Android studio
3. Build Project
4. Run and debugging the project on youR AVD emulator

## Featured Technologies
- Kotlin
- Retrofit
- Firebase
- Room
- Retrofit

## Mockup Application
### Splash Screen
![alt text](https://github.com/CekApel/Mockup_Application/blob/master/SplashScreen.png?raw=true)

### OnBoarding
![alt text](https://github.com/CekApel/Mockup_Application/blob/master/OnBoarding_1.png?raw=true) ![alt text](https://github.com/CekApel/Mockup_Application/blob/master/OnBoarding_2.png?raw=true) ![alt text](https://github.com/CekApel/Mockup_Application/blob/master/OnBoarding_3.png?raw=true) ![alt text](https://github.com/CekApel/Mockup_Application/blob/master/OnBoarding_4.png?raw=true) 

### Login
![alt text](https://github.com/CekApel/Mockup_Application/blob/master/Login.png?raw=true)

### Register
![alt text](https://github.com/CekApel/Mockup_Application/blob/master/Register.png?raw=true)

### Forgot Password
![alt text](https://github.com/CekApel/Mockup_Application/blob/master/ForgotPassword.png?raw=true)

### Home
![alt text](https://github.com/CekApel/Mockup_Application/blob/master/Home.png?raw=true)

### Scan
![alt text](https://github.com/CekApel/Mockup_Application/blob/master/scan.png?raw=true) ![alt text](https://github.com/CekApel/Mockup_Application/blob/master/ScanResult.png?raw=true) ![alt text](https://github.com/CekApel/Mockup_Application/blob/master/ScanHistory.png?raw=true) ![alt text](https://github.com/CekApel/Mockup_Application/blob/master/ScanDetail.png?raw=true) 

### Articles
![alt text](https://github.com/CekApel/Mockup_Application/blob/master/Article.png?raw=true) ![alt text](https://github.com/CekApel/Mockup_Application/blob/master/ArticleDetail.png?raw=true)

### Settings
![alt text](https://github.com/CekApel/Mockup_Application/blob/master/Profil.png?raw=true) ![alt text](https://github.com/CekApel/Mockup_Application/blob/master/EditProfile.png?raw=true) ![alt text](https://github.com/CekApel/Mockup_Application/blob/master/About.png?raw=true)

# Machine Learning Learning Path

## Dataset

[Apple-Revised](https://www.kaggle.com/datasets/ezziomonk/apple-revised/data)

## Key Features

* Image Classification for 4 classes
  - Apple Scab
  - Black Rot
  - Cedar Apple Rust  
  - Healthy

## Library Used

* Cv2
* Matplotlib
* NumPy
* Os
* Tensorflow
* Pathlib
* Pandas
* Random
* Shutil
* Zipfile

## Models Accuracy and Loss

1. Train and Val Accuracy (train 92 and val 93)

![WhatsApp Image 2024-12-11 at 21 27 49](https://github.com/user-attachments/assets/c9c8b0f7-b77d-4108-a9f9-be4c3f3990d2)

2. Train and Val Loss (train 0.22 and val 0.16)

![WhatsApp Image 2024-12-11 at 21 27 49 (1)](https://github.com/user-attachments/assets/a4047e1c-f439-41d7-85de-8c9cd2b89d8b)

3. Test Accuracy

![WhatsApp Image 2024-12-11 at 21 27 48](https://github.com/user-attachments/assets/dcc1f25a-35d8-4174-b92d-6771e70aab74)


# Cloud Computing Learning Path

# Article and Prediction API

This API is used to manage articles and perform image classification predictions using a machine learning model.

## Features
- Retrieve all articles
- Add new articles with images
- Update articles by name
- Perform image classification predictions

## Running the Server
The server is deployed on Google Cloud Platform (GCP) using App Engine.

## API Documentation

### 1. Retrieve All Articles
**GET** `/artikels`

- **Description:** Retrieve a list of all articles.
- **Response:**
  ```json
  {
    "status": "success",
    "data": [
      {
        "id": "string",
        "nama": "string",
        "deskripsi": "string",
        "penanganan_penyakit": "string",
        "image_url": "string"
      }
    ]
  }
  ```

### 2. Add New Article
**POST** `/artikels`

- **Description:** Add a new article with an image.
- **Body:**
  - `nama` (string)
  - `deskripsi` (string)
  - `penangananPenyakit` (string)
  - `image` (file)
- **Response:**
  - `201`: Article successfully added
  - `409`: Article with the same name already exists

### 3. Update Article
**PUT** `/artikels/{nama}`

- **Description:** Update an article by name.
- **Body:**
  - `deskripsi` (string, optional)
  - `penangananPenyakit` (string, optional)
  - `image` (file, optional)
- **Response:**
  - `200`: Article successfully updated
  - `404`: Article not found

### 4. Perform Image Classification Prediction
**POST** `/predict`

- **Description:** Perform image classification prediction.
- **Body:**
  - `image` (file)
- **Response:**
  ```json
  {
    "status": "success",
    "message": "Model is predicted successfully.",
    "data": {
      "result": "string",
      "explanation": "string",
      "suggestion": "string",
      "medicine": "string",
      "confidenceScore": 100,
      "createdAt": "2024-12-11T10:00:00.000Z"
    }
  }
  ```

## Dependencies
- **Node.js**
- **Hapi.js**
- **Sequelize** (ORM for database)
- **GCP Bucket SDK** (for image uploads)

## Environment Configuration
Create a `.env` file in the project root and add the following configurations:

```env
DB_HOST=
DB_USER=
DB_PASS=
DB_NAME=
GCP_BUCKET_NAME=
MODEL_PATH=
```

## Cloud Architecture
The following is the cloud architecture used in this project:

![Cloud Architecture](https://github.com/CekApel/cloud_computing/blob/b4257ed3c2adbde9fd9f003636c99f28d5c161f4/CloudArchi.png)

## ML Deployment Architecture
The following is the machine learning model deployment architecture:

![ML Deployment Architecture](https://github.com/CekApel/cloud_computing/blob/b4257ed3c2adbde9fd9f003636c99f28d5c161f4/mlArchi.png)
