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
