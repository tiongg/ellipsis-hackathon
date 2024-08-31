# Google oauth setup (For authentication)

1. Login to [google cloud console](https://console.cloud.google.com/)
2. Create a new project (top left, beside the search bar)
3. Switch to that project when it is created
4. Search for 'oauth' in the cloud console
5. On the left nav bar, select 'OAuth consent screen'
6. Press create
7. Fill in the following

```
App name: Sustainabites
User support email: Your email
Developer contact information: Your email
```

8. Click on 'Save and Continue'
9. Click on 'Add or remove scopes'
10. Select 'openid'
11. Click on 'Save and Continue'
12. Click on 'Save and Continue' again
13. Click on 'Back to dashboard'
14. Click on 'Credentials' on the left nav bar
15. Click on 'Create credentials' (at the top, right below the search bar)
16. Select 'OAuth client ID'
17. Select 'Web application'
18. Under 'Authorized JavaScript origins', add 'http://localhost:3000'
19. Under 'Authorized redirect URIs', add 'http://localhost:3000/auth/google/redirect'
20. Click on 'Create'
21. Note the Client ID and Client secret
22. Set enviroment secrets to:

```
GOOGLE_CLIENT_ID=<CLIENT-ID-HERE>
GOOGLE_CLIENT_SECRET=<CLIENT-SECRET-HERE>
```
