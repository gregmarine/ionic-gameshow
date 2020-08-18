# ionic-gameshow
Example of using Deep Linking in Ionic/React

We create a new component to handle all the URLs being passed for deep linking. Here is a base example
```typescript
import React, { useEffect } from 'react';
import { useHistory } from "react-router-dom";
import { Plugins } from '@capacitor/core';
const { App: CapApp } = Plugins;

const DeepLinkListener: React.FC<any> = () => {
    let history = useHistory();
    useEffect(() => {
        CapApp.addListener('appUrlOpen', (data: any) => {
            // Example url: https://mycoolsite.com/pages/page1
            // slug = /pages/page1
            const slug = data.url.split(".com").pop();
            if (slug) {
                history.push(slug);
            }
            // If no match, do nothing - let regular routing 
            // logic take over
        });
    }, [history]);

    return null;
};

export default DeepLinkListener;
```

After that, all we need to do is import it where our app initializes. In this case, App.tsx
```typescript
import DeepLinkListener from './components/DeepLinkListener';
```
...

```typescript
const App: React.FC = () => {

  return (
    <IonApp>
      <IonReactRouter>
      
        <DeepLinkListener />
        
        <IonSplitPane contentId="main">
          <Menu />
          <IonRouterOutlet id="main">
            <Route path="/page/:name" component={Page} exact />
            <Redirect from="/" to="/page/Inbox" exact />
          </IonRouterOutlet>
        </IonSplitPane>
      </IonReactRouter>
    </IonApp>
  );
};
```
