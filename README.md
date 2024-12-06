# Playwright PDF Generation Script Integration

## Overview

This project uses Playwright to log into specific URLs, generate PDFs for reports, and save them with dynamically generated file names. The script is designed to run in a secure environment, leveraging .env files for sensitive credentials. This guide outlines how to integrate the script into AWS for automated execution.

---

## Prerequisites

1. **AWS Account**: Ensure you have access to an AWS account with permissions to create and manage resources (e.g., Lambda, S3, or ECS).
2. **Node.js**: Version 18 or higher is required for Playwright.
3. **AWS CLI**: Ensure the AWS CLI is installed and configured.
4. **Docker**: Required for deploying Playwright scripts to AWS Lambda or ECS.

---

## Files and Structure

```plaintext
project/
├── tests/
│   ├── pdf-generation.spec.ts       # Playwright test script
├── utilities/
│   ├── utilities.page.ts            # Utility functions
├── .env                             # Environment variables
├── README.md                        # This file
├── package.json                     # Node.js dependencies
├── playwright.config.ts             # Playwright configuration
```

### .env File
Add your credentials.

```plaintext
USERNAME=your-username
PASSWORD=your-password
```

---

## Steps to Integrate into AWS

### Step 1: Install Dependencies

1. Clone the repository.
   ```bash
   git clone <repo-url>
   cd project
   ```

2. Install Node.js dependencies.
   ```bash
   npm install
   ```

3. Verify that Playwright is installed and ready.
   ```bash
   npx playwright install
   ```
4. To run the reports (PLEASE ONLY USE 1 WORKER)
   ```bash
   npx playwright test --workers=1
   ```
---

### Step 2: Package for AWS

1. Create a **Dockerfile** in the root of the project:
   ```dockerfile
   FROM mcr.microsoft.com/playwright:focal

   # Set the working directory
   WORKDIR /app

   # Copy the project files
   COPY . .

   # Install dependencies
   RUN npm install

   # Set the entry point for the script
   ENTRYPOINT ["npx", "playwright", "test"]
   ```

2. Build the Docker image.
   ```ash
   docker build -t playwright-pdf-generator .
   ```

3. Test the Docker container locally.
   ```ash
   docker run --env-file .env playwright-pdf-generator
   ```

---

### Step 3: Deploy to AWS Lambda

1. **Install AWS Lambda Node.js Runtime**:
   Use AWS Lambda to execute the script as a function. You'll need the [AWS Lambda Layers for Playwright](https://github.com/alixaxel/chrome-aws-lambda).

2. **Zip the Project**:
   Package the project for Lambda.
   ```ash
   zip -r playwright-pdf-generator.zip .
   ```

3. **Create the Lambda Function**:
   Use the AWS CLI to create the function.
   ```ash
   aws lambda create-function \
       --function-name PlaywrightPDFGenerator \
       --runtime nodejs18.x \
       --role <IAM_ROLE_ARN> \
       --handler tests/pdf-generation.spec.ts \
       --zip-file fileb://playwright-pdf-generator.zip
   ```

4. **Update Environment Variables**:
   Add the .env file content as Lambda environment variables.

5. **Test the Lambda**:
   Trigger the Lambda function and check the logs for PDF generation.

---

### Step 4: Deploy to ECS (Optional)

1. **Create an ECS Cluster**:
   ```ash
   aws ecs create-cluster --cluster-name PlaywrightPDFCluster
   ```

2. **Register a Task Definition**:
   ```ash
   aws ecs register-task-definition \
       --family PlaywrightPDFTask \
       --container-definitions '[
           {
               "name": "playwright-pdf-container",
               "image": "playwright-pdf-generator",
               "memory": 512,
               "cpu": 256,
               "essential": true,
               "environment": [
                   {"name": "USERNAME", "value": "your-username"},
                   {"name": "PASSWORD", "value": "your-password"}
               ]
           }
       ]'
   ```

3. **Run the Task**:
   ```ash
   aws ecs run-task \
       --cluster PlaywrightPDFCluster \
       --task-definition PlaywrightPDFTask
   ```

---

### Step 5: Store PDFs in S3

1. **Add an S3 Bucket**:
   ```ash
   aws s3api create-bucket --bucket playwright-pdf-reports --region us-east-1
   ```

2. **Upload PDFs**:
   Modify the script to upload generated PDFs to S3 after creation:

   ```	ypescript
   import AWS from 'aws-sdk';

   const s3 = new AWS.S3();
   async function uploadToS3(filePath: string, bucketName: string) {
       const fileContent = fs.readFileSync(filePath);
       const params = {
           Bucket: bucketName,
           Key: path.basename(filePath),
           Body: fileContent,
       };
       await s3.upload(params).promise();
       console.log(\Uploaded \ to S3\);
   }
   ```

3. Update the PDF generation logic to call \uploadToS3\ after creating the file.

---

## Monitoring and Logging

- **CloudWatch**: Ensure logs are enabled for Lambda or ECS tasks.
- **Retries**: Configure automatic retries in AWS for failed runs.
- **Alerting**: Set up alarms in CloudWatch for errors.

---

## Conclusion

This setup ensures your Playwright script runs seamlessly in AWS, generating PDFs for the specified URLs and securely storing them in S3. Let me know if you need further customization or help!
