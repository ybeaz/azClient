# azClient
JS mini library to track users and their data on the site

**Usage**

1. add to the page the script azClient.min.js
2. add to each html tag  you want to get data a class to collect data
3. Class should contain four parts devided by underscore and have the following form,
for example: `utAzAction_input_fieldPhoneInput_2`, where
    * `utAzAction` - constant name of the library, convention
    * `input` - event type, see [Event reference](https://developer.mozilla.org/en-US/docs/Web/Events)
    * `fieldPhoneInput`- unique for this page name, that means for you something
    * `2` number, that more than 0 and indicates how close the user got to the target no matter how you define it


