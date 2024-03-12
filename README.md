## Executor

**&nbsp;ℹ&nbsp;Note**:

- We recommend a Chromium-based web browser for local development with HTTP. \
  Safari enforces HTTPS; therefore, it doesn't allow localhost through HTTP.
- For more information, visit our [developer documentation](https://developers.miro.com).

### How to start locally

- Run `npm i` to install dependencies.
- Run `npm run start` to start developing.

### How to build the app

- Run `npm run build`. \
  This generates a static output inside [`dist/`](./dist), which you can host on a static hosting
  service.

### Folder structure used FSD Principles

```
.
├── src
│  ├── assets
│  │  └── style.css // Main style file
│  ├── components // complex structures built with shared blocks
│  ├── entities // describe objects what used in scripts
│  ├── shared // whole project used scripts
│  │  └── api // Web SDK and REST Api
│  │  └── ApiRoutes // enum of REST Api routes
│  │  └── store // state manager of app
│  │  └── ui // base styled components 
│  └── app.tsx    // The code for the app lives here
├── app.html       // The app itself. It's loaded on the board inside the 'appContainer'
└── index.html     // The app entry point. This is what you specify in the 'App URL' box in the Miro app settings
```

### About the app

This sample app provides you with boilerplate setup and configuration that you can further customize to build your own app.

Built using [`create-miro-app`](https://www.npmjs.com/package/create-miro-app).
App for uploading student's homework and resize references

This app uses [Vite](https://vitejs.dev/). \
If you want to modify the `vite.config.js` configuration, see the [Vite documentation](https://vitejs.dev/guide/).
