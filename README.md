- The application extracts potential candidates information from their cv's that can be uploaded as a pdf by them.

- The first line usually contains the applicant's name, so to extract the name we take the first word in the first line as the first name and the rest from the first line as the last name.

- The rest of the information is extracted using regex.

- The application saves the application information together with the cv file in MongoDB.

- The applicant can delete his application and download his cv file by clicking a button.
