## general 
    - admin privileges
    - charts to reflect project progress

## login/sign up
    - facebook log in not working 
    - test mode
    - add to users collection for google/github log in 
    - css 

## main 
    - dashboard. 
    - your task | project progress | announcement | message? | schedule (display "nothing coming up" if none)
    - need design ideas 

## members 
    -include accounts using google/github log in 
    - delete/ edit function for admin 
    - add profile pictures
    - hiredate as account creation date
    - employee number 
        - same as ticket #
    - click email address to send email (pop up)

## ticket 
    -set ID unedditable, read from firebase. 
    -click ticket to view details 
        --style
    -assign to drop menu that contains members list 
    -drag drop to change status 
    -pie chart to reflect data

## projects 
    - import from github? (commit history, etc)
    - firebase 
        -thumbnail
        -description
    - click to view details 
        -details above 
        -authors 
        -tickets related to the project
    - ability to join on project, needs approval by the owner of project
    - admin can add/remove/edit projects details 
        - can assign members 
    - members, tags accept array, auto complete 
        - tags don't have to be in collections 

## calendar 
    - save events to server (it disappears on refresh rn)


### urgent/crtical bug
- ticket 
    - ticket number needs to be initialized (0)
    - either non input to hold ticket id + 1 value and display
        - or  input with readOnly and assign input value (not placeholder)
        
### low-priority 
- facebook log in not working 
- log in with ID/PW
- tailwind css
    -sidebar close button
- user profile pop up click anywhere to close 

