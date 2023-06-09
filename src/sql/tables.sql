CREATE DATABASE cars_exam;
\c cars_exam
CREATE EXTENSION "uuid-ossp";

CREATE TABLE admin(
    id TEXT NOT NULL UNIQUE DEFAULT uuid_generate_v4(),
    name VARCHAR(50) NOT NULL,
    email VARCHAR(80) NOT NULL,
    image TEXT DEFAULT 'https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png',
    password TEXT NOT NULL
);
INSERT INTO admin(name,email,password)VALUES('John Doe','johnadmin@gmail.com', '123456');

CREATE TABLE users(
    id TEXT NOT NULL UNIQUE DEFAULT uuid_generate_v4(),
    name VARCHAR(50) NOT NULL,
    email VARCHAR(80) NOT NULL,
    password TEXT NOT NULL,
    registered TIMESTAMP DEFAULT CURRENT_DATE,
    image TEXT NOT NULL DEFAULT 'https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png'
);

CREATE TABLE companies(
    id TEXT NOT NULL UNIQUE DEFAULT uuid_generate_v4(),
    title VARCHAR(50) NOT NULL,
    image TEXT NOT NULL
);

CREATE TABLE cars(
    id TEXT NOT NULL UNIQUE DEFAULT uuid_generate_v4(),
    title VARCHAR(50) NOT NULL,
    side_image TEXT,
    outside_image TEXT,
    inner_image TEXT,
    tinted BOOLEAN DEFAULT false,
    year VARCHAR(4) NOT NULL,
    color TEXT NOT NULL,
    distance INT DEFAULT 0,
    gearbox TEXT DEFAULT 'manual',
    description TEXT,
    company_id TEXT, FOREIGN KEY (company_id) REFERENCES companies(id)
);
INSERT INTO admin(title,side_image,outside_image,inner_image,tinted,year,color,distance,gearbox,description,company_id)VALUES('BMW Sedan','https://cars.usnews.com/static/images/Auto/izmo/i36138920/2018_bmw_5_series_sideview.jpg', 'https://platform.cstatic-images.com/xlarge/in/v2/stock_photos/142afb2a-16ef-4d8a-b205-561da44e26a8/de481502-7e80-4a36-a5e2-269f5d56f1c1.png','https://imgcdn.oto.com/large/gallery/interior/3/2195/bmw-3-series-sedan-dashboard-view-719287.jpg',true,2023,'black',1000,'automatic','One of the best selling models of BMW','fc57c7ac-e553-4bfb-b03c-4ffc149ce5bc');

CREATE TABLE liked_cars(
    id TEXT NOT NULL UNIQUE DEFAULT uuid_generate_v4(),
    user_id TEXT, FOREIGN KEY (user_id) REFERENCES users(id),
    car_id TEXT, FOREIGN KEY (car_id) REFERENCES cars(id)
);

CREATE TABLE buy_cars(
    id TEXT NOT NULL UNIQUE DEFAULT uuid_generate_v4(),
    user_id TEXT, FOREIGN KEY (user_id) REFERENCES users(id),
    car_id TEXT, FOREIGN KEY (car_id) REFERENCES cars(id)
);