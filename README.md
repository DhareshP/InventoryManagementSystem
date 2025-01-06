# Inventory Management System

## Overview

This project is an Inventory Management System built using Django to efficiently manage products, stock levels, suppliers, and sales. The system supports CRUD operations for products and suppliers, facilitates stock management, and enables tracking of sales orders. A user-friendly interface enhances the functionality.

## Features

### Mandatory Features

- **Product Management**

  - Add, update, delete, and list products.
  - Validate product details, including stock quantity and price.
  - Ensure no duplicate products exist.

- **Supplier Management**

  - Add, update, delete, and list suppliers.
  - Validate email and phone number formats.
  - Ensure no duplicate supplier records exist.

- **Stock Movement**

  - Record incoming stock ("In") or outgoing stock ("Out").
  - Automatically update stock levels.
  - Prevent negative stock levels.

- **Sale Order Management**

  - Create sale orders with stock verification and total price calculation.
  - Cancel sale orders and revert stock levels.
  - Mark orders as "Completed" and update stock accordingly.
  - List all sale orders with details such as product name, quantity, total price, sale date, and status.

- **Stock Level Check**

  - Check and return the current stock level for each product.

## Tech Stack

- **Backend**: Django
- **Frontend**: HTML, CSS, JavaScript
- **Database**: MongoDB

## Database Models

### Product

| Field           | Type                    |
| --------------- | ----------------------- |
| name            | string                  |
| description     | text                    |
| category        | string                  |
| price           | decimal                 |
| stock\_quantity | integer                 |
| supplier        | foreign key to Supplier |

### Supplier

| Field   | Type               |
| ------- | ------------------ |
| name    | string             |
| email   | email              |
| phone   | string (10 digits) |
| address | text               |

### Sale Order

| Field        | Type                                 |
| ------------ | ------------------------------------ |
| product      | foreign key to Product               |
| quantity     | integer                              |
| total\_price | decimal                              |
| sale\_date   | date                                 |
| status       | string (Pending/Completed/Cancelled) |

### Stock Movement

| Field          | Type                   |
| -------------- | ---------------------- |
| product        | foreign key to Product |
| quantity       | integer                |
| movement\_type | string ("In"/"Out")    |
| movement\_date | date                   |
| notes          | text                   |

## Installation

### Prerequisites

- Python 3.8+
- MongoDB
- Django

### Steps

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd <repository-directory>
   ```

2. Create and activate a virtual environment:

   ```bash
   python -m venv venv
   source venv/bin/activate   # For Windows: venv\Scripts\activate
   ```

3. Install dependencies:

   ```bash
   pip install -r requirements.txt
   ```

4. Set up the database connection in the `settings.py` file:

   ```python
   DATABASES = {
       'default': {
           'ENGINE': 'djongo',
           'NAME': '<database_name>',
       }
   }
   ```

5. Apply migrations:

   ```bash
   python manage.py makemigrations
   python manage.py migrate
   ```

6. Run the development server:

   ```bash
   python manage.py runserver
   ```

7. Access the application in your browser at [http://127.0.0.1:8000](http://127.0.0.1:8000).

## Usage

- **Add Products and Suppliers**: Navigate to the respective pages and fill out the forms.
- **Manage Stock**: Record incoming or outgoing stock under the Stock Movement section.
- **Create and Track Sale Orders**: Use the Sale Order section to manage orders and update their status.
- **Filter Data**: Apply filters for products by category or orders by status.

## Testing

Run the tests to ensure functionality:

```bash
python manage.py test
```

## Contributing

1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Commit your changes and open a pull request.

