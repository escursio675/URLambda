# Issues List

1. <3rd May, 4:14>, ISSUE: Link generation is split across two files: `/url-shortener/backend/src/services/url.service.js` and  `/url-shortener/backend/src/controllers/url.controller.js` . As a result business logic is handled by the controller and the complete short URL is inaccessible to the business logic/service layer.

<3rd May, 12:44>, Fix: Store the short URL in the database and return the complete short URL through `/url-shortener/backend/src/services/url.service.js`with the `createShortUrl()` function .

1. <5th May, 13:56>, ISSUE: Generate QR button stopped performing it's function and as a result creates a new short URL instead of QR code

<5th May, 16:00>, Fix: onClick event is used with the generate QR button.

1. <5th May, 16:45>, ISSUE: Text overlapping with the card form after QR code generation

<5th May, 17:19>, Fix: Used relative spacing between typing text and the form.