![image](https://github.com/user-attachments/assets/7631e484-3a79-4bec-827d-3d7e07cc3c58)

---

# Contributing to 42Project Compass

Thank you for considering contributing to this project! Your contributions are highly valued and appreciated. Contributions can range from fixing simple typos to implementing major new features.

## How to Contribute

### 1. Fork the Repository

1. Fork the repository by clicking the "Fork" button at the top right of the project page.
2. Clone your fork to your local machine

### 2. If Your Contribution Is a Learning Objective or Resource Addition:

**Fork the DATABASE repository [42Project_compass_DB](https://github.com/Matsadura/42project_compass_DB)**

1. Navigate to the directory of your cloned fork:

   ```bash
   cd 42project_compass_DB
   ```

2. Depending on your contribution type:
   - For learning objectives, go to the `learning_objectives` folder.
   - For resources, go to the `resources` folder.

3. If the project file doesn’t already exist, create a new JSON file named after the project's identifier. 

   **Example**: For the `libft` project, use the project URL to determine the name:
   - Project link: 
     ```
     https://projects.intra.42.fr/42cursus-libft/mine
     ```
     or
     ```
     https://projects.intra.42.fr/projects/42cursus-libft
     ```
     The project name is `42cursus-libft`, so the file should be named `42cursus-libft.json`.

4. Follow these formats:
   - **Learning Objectives**:
     ```json
     [
       "Learning objective 1",
       "Learning objective 2"
     ]
     ```
   - **Resources**:
     ```json
     {
       "Resource topic 1": "link for resource 1",
       "Resource topic 2": "link for resource 2"
     }
     ```

**IMPORTANT**: Ensure the contents of the JSON file are validated using [JSON Validator](https://jsonlint.com/)
---

### 3a. If Your Contribution Is Code-Related:

1. Open Chrome and navigate to the "Extensions" page.
2. Enable **Developer Mode**.
3. Click on **Load Unpacked** and select the cloned fork directory.
4. Make changes to the codebase.
5. Reload the extension.
6. Refresh the 42 intranet page.
7. Test your changes.
8. Repeat steps 4–7 as needed.

### 3b. Make Changes

- **Make your changes**: Implement the new feature, fix a bug, or improve the documentation.

- **Commit your changes**: Write clear and concise commit messages.

  ```bash
  git add .
  git commit -m "Add feature: description of your feature"
  ```

### 4. Test Your Changes

Before submitting your changes, ensure that everything works as expected:

- **Run tests**: If you’ve added new functionality, make sure to write and run tests to verify your changes.

### 5. Submit a Pull Request

1. Push your branch to your fork:

   ```bash
   git push origin feature/your-awesome-feature-name
   ```

2. Go to the original repository on GitHub and submit a pull request.
3. Provide a detailed description of your changes, including the motivation and context.

### 6. Code Review

Your pull request will be reviewed by one of the project maintainers. Please be responsive to any feedback or requests for changes.

## Coding Standards

- **JavaScript:** Follow the [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript) for writing clean and consistent code.
- **Commit Messages:** Use meaningful commit messages that describe what your changes do.

## Issue Reporting

If you find a bug or have a feature request, please open an issue on GitHub. Make sure to provide detailed information about the problem, how to reproduce it, and your environment (OS, browser, etc.).
