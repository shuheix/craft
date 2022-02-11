/* eslint-disable no-undef */
// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import { attachCustomCommands } from "cypress-firebase";

const fbConfig = {
  apiKey: Cypress.env("CYPRESS_API_KEY"),
  authDomain: Cypress.env("CYPRESS_AUTH_DOMAIN"),
  projectId: Cypress.env("CYPRESS_PROJECT_ID"),
  storageBucket: Cypress.env("CYPRESS_STORAGE_BUCKET"),
  messagingSenderId: Cypress.env("CYPRESS_MESSAGING_SENDER_ID"),
  appId: Cypress.env("CYPRESS_APP_ID"),
  measurementId: Cypress.env("CYPRESS_APP_MEASUREMENT"),
};

firebase.initializeApp(fbConfig);

// eslint-disable-next-line no-undef
attachCustomCommands({ Cypress, cy, firebase });

//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
