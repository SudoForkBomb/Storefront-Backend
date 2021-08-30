# API Requirements

The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application.

## API Endpoints

#### Products

- [GET] /products - Returns All Products.
- [GET] /products/{productId} - Show Individual Product by Id.
- [POST] /products - Creates a new Product, [Requires Auth Token.]

#### Users

- [GET] /users - Returns All Users, [Requires Auth Token.]
- [GET] /users/{userId} - Returns Individual User by Id, [Requires Auth Token.]
- [POST] /users - Create new User, [Requires Auth Token.]

#### Orders

- [GET] /orders/{userId}/active - Returns Current Order of User, [Requires Auth Token.]
- [GET] /orders/{userId}/complete - Returns all Completed Orders by User, [Requires Auth Token.]

## Data Shapes

#### Product

- id: SERIAL PRIMARY KEY
- name: VARCHAR(64) NOT NULL
- price: integer NOT NULL
- category: VARCHAR(100)

#### User

- id: SERIAL PRIMARY KEY
- first_name: VARCHAR(100)
- last_name: VARCHAR(100)
- password_digest: VARCHAR

#### Orders

- id: SERIAL PRIMARY KEY
- user_id: integer REFERENCES users(id)
- status: VARCHAR(64)

#### Order_Products

- id: SERIAL PRIMARY KEY
- quantity: integer
- order_id: integer REFERENCES orders(id)
- product_id: integer REFERENCES products(id)
