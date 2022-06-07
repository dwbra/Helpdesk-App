# Ticket Support System Application

A Ticket Support System App using TypeScript/ReactJS for the client side and PHP for the server.

To continue building on my Typescript and ReactJS knowledge, I thought developing a "Helpdesk" ticketing support system for users to lodge their support tickets and admins being able to respond would be a fun project to do so. The obvious choice for ReactJS would have been NodeJS however I also wanted to work on improving my knowledge of PHP as it is a battle-hardened server side language.

The application contains

- authentication with validation tests
- ability to create new users with validation tests
- ability for users to submit tickets
- ability for users to view all and individual tickets
- ability for users to comment on a ticket and have a running diaolg with admin
- ability for users to upload images with their tickets
- AWS S3 image hosting, to store all ticket images in the cloud, whilst storing their key in the sql db
- Redux implementation, using asyncthunk slices to handle dispatching of data between the frontend and server
- Axios to handle frontend API requests to server

As I'm not a designer, and as css was not the focus of this project the styling is very basic.

Note - Throughout the process I was learning git correctly and had some serious issues merging branches. So instead of battling through and figuring it out I just deleted the repo from Github and pushed up my local version or sometimes even vise versa. This explains why there isn't far more commits than would be expected in a self taught project like this!

Happy to answer any questions if you do fork the repo.
Cheers,
Daniel

To setup and run:

in one terminal tab -

- cd into client
- yarn install
- yarn start

in second terminal tab -

- cd into server
- composer install
- php -S localhost:8000
