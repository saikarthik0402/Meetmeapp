// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: true,
  
  signupurl : "http://localhost:8080/signup",
  loginurl : "http://localhost:8080/login",
  roleurl : "http://localhost:8080/get/role",
  logouturl : "http://localhost:8080/logout",
  getuserurl : "http://localhost:8080/get/user",
  templateurl : "http://localhost:8080/meetmetemplate.xlsx",
  attendeeurl : "http://localhost:8080/upload/attendee",
  inviteurl: "http://localhost:8080/invite/organiser",
  validateattendee: "http://localhost:8080/validate/attendee",
  bookslot: "http://localhost:8080/bookattendeeslot"
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
