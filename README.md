
- JWT Authentication Flow for User Signup & User Login
- Project Structure for React JWT Authentication (without Redux) with SessionStorage, React Router & Axios
- Creating React Components
- Dynamic Navigation Bar in React App

We will build a React application in that there is Login/Logout, Register, Home, and Dashboard pages and React js Login Authentication Routes



# React js Laravel Auth:
    - Laravel 9
    - Mysql
    - React js 17.0.2
    - bootstrap 5
    - react-router-domv6
    - axios
    - Formik
    - Yup
    - dotenv
    - react-data-table-component
    - styled-components
    - react-modal
    - react-toastify



## Backend
1. First clone project in your pc: 
    Run ```git clone https://github.com/itjewel/react-laravel-authentication-projectmanagment.git``` 
2. PHP Version needed above 8.0
3. cd into the "Laravel" folder:
   Run ```cd Laravel``` 

4. Copy .env.example file and rename as .env; 
Alternatively, run ```cp .env.example .env```

5. Edit database credentials in your newly generated/created .env file

6. Run ```composer install``` to install all libraries and dependencies in the composer.lock file

7. Run ```php artisan key:generate``` to set the APP_KEY value in the .env file

8. Run ```php artisan jwt:secret``` 

9. Run ```composer require tomfordrumm/jwt-auth:dev-develop```
10. Having created a database, and specifying the same with the right credentials in your .env file, run ```php artisan migrate``` to create the tables

11. Run ```php artisan serve``` to run the PHP development server. Alternatively, you can run your project with XAMPP or WAMP.


## Frontend

12. cd into the "reactjs" folder:
   Run ```cd reactjs```

13. Run ```npm install``` to download all packages and dependencies needed for our client

14. While making sure that the API (Laravel) Server is up and running, run ```npn start``` to start your react application

15. Congratulations!!!

## Featues
16. Login Form
![alt text](https://github.com/itjewel/react-laravel-authentication-projectmanagment/blob/master/features-images/login-page.png)

17. Registration Form
![alt text](https://github.com/itjewel/react-laravel-authentication-projectmanagment/blob/master/features-images/register-page.png)

18. Home Page 
![alt text](https://github.com/itjewel/react-laravel-authentication-projectmanagment/blob/master/features-images/home-page.png)

19. Project Added Form 
![alt text](https://github.com/itjewel/react-laravel-authentication-projectmanagment/blob/master/features-images/project-add.png)

20. Project View and datatable use in dashboard page 
![alt text](https://github.com/itjewel/react-laravel-authentication-projectmanagment/blob/master/features-images/dashboard-datatable-searching.png)


21. Project details, project assign, task list show page 
![alt text](https://github.com/itjewel/react-laravel-authentication-projectmanagment/blob/master/features-images/project-details-assign-task-add.png)

22. Task added page 
![alt text](https://github.com/itjewel/react-laravel-authentication-projectmanagment/blob/master/features-images/task-add.png)

23. Project Searching without datatable 
![alt text](https://github.com/itjewel/react-laravel-authentication-projectmanagment/blob/master/features-images/searching-without-datatable.png)














