# Shopping List 

Shopping List is a simple web application built primarily with `React`, `TypeScript`, `Redux`, and `Tailwind CSS`. It allows users to manage a shopping list by adding, editing, and removing products. The app initializes with randomly generated items loaded from a JSON file and is designed primarily for desktop browsers.

## Technologies Used:
- [**Vite**](https://vitejs.dev/): Provides a fast and modern development environment with instant hot module replacement and optimized builds.
- [**React**](https://reactjs.org/) + [**TypeScript**](https://www.typescriptlang.org/): React is a powerful UI library, and TypeScript adds type safety and better tooling support, making the codebase more robust and maintainable.
- [**Redux**](https://redux.js.org/): Enables predictable state management, making it easier to handle updates across components and scale the app logic cleanly.
- [**Tailwind CSS**](https://tailwindcss.com/): A utility-first CSS framework that speeds up styling with responsive design utilities and ensures a consistent UI without writing custom CSS.
- [**Jest**](https://jestjs.io/): A testing framework used to write reliable unit tests and ensure that core functionality works as expected.

## Features
Users can add new products by specifying both a name and an amount, with built-in validation to prevent empty or invalid inputs. Existing items can be edited directly within the list, allowing quick adjustments. Products can be removed with a single click—no confirmation dialog. To simulate a starting point, the app automatically generates a random list of items on each launch from a predefined JSON file. All data is managed in-memory using Redux, and changes are not persisted across sessions. 

## Validation
The application enforces the following validation rules on product name and amount:

- **Product Name:** Must be between 3 and 30 characters long. It requires at least one alphabetic character, and allows letters, numbers, hyphens (`-`), and underscores (`_`). Names shorter than 3 characters or containing invalid characters are not accepted.
- **Amount:** Must be a positive number greater than 0 and less than 10,000. Decimal values are allowed, but up to a maximum of 5 decimal places.

## Initial Product Generation

At application startup, the shopping list is initialized with *5 to 25* random products. These products are selected from a static `initialProducts.json` file located in the `public/` directory.

The generation logic:
- Loads all available products from the JSON file
- Randomly selects a subset of them on every app launch

### To Run the Application
There are two options to run the application: using *Docker* and *without Docker*.

### Using Docker 

Build the Docker Image
```bash
docker build -t shopping-list .
```

Run the Container 
```
 docker run -p 5173:5173 shopping-list
```
Open your browser at http://localhost:5173 to access the *Shopping List*.

### Without Docker (Recommended for Debugging)
If you prefer not to run it through Docker, follow the steps below:

Install Dependencies
```
npm install
```
 Start the Development Server 
```
 npm run dev 
 ```
Open your browser at: http://localhost:5173 to access the *Shopping List*.


## Running tests 

There is a suite of test cases which can be run via the following command:
```
npm run test
```
The tests can be found in `src/tests/`.

## Contact
For details, feel free to contact me:
[Shweta Kumari](mailto:shwetaruhi0@gmail.com)
