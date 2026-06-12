# SPFx Golden Standard — Projektaufbau & Konventionen

Dieses Dokument ist der verbindliche Goldene Standard für alle SPFx-Projekte. Alles hier basiert auf dem bewährten `SPFX-test`-Referenzprojekt und den Firmenanforderungen.

---

## 1. Tech Stack

| Paket | Version |
|---|---|
| `@microsoft/sp-*` | 1.23.1 |
| `react` + `react-dom` | 17.0.1 |
| `@fluentui/react` | ^8.106.4 |
| `@reduxjs/toolkit` | ^2.12.0 |
| `react-redux` | ^8.1.3 |
| `redux-thunk` | ^3.1.0 |
| `@pnp/sp` | ^4.19.0 |
| `@pnp/graph` | ^4.19.0 |
| `@microsoft/microsoft-graph-types` | latest |
| `glb-sp-fx-core` | ^1.8.0 |
| `tslib` | 2.3.1 |

---

## 2. Ordner- und Dateistruktur

```
src/
├── constants/
│   ├── GraphQueryConstants.ts
│   └── SpQueryConstants.ts
├── redux/
│   ├── reducers/
│   │   ├── CommonsStateReducer.ts
│   │   ├── RootReducer.ts
│   │   └── [Feature]StateReducer.ts
│   └── Store.ts
├── services/
│   ├── LoggingService.ts
│   └── [Feature]Service.ts
├── stateModels/
│   ├── CommonsState.ts
│   └── [Feature]State.ts
└── webparts/
    └── [webpartName]/                ← camelCase
        ├── components/
        │   ├── [featureName]Component/    ← camelCase Ordner
        │   │   └── [Feature]Component.tsx ← PascalCase Datei
        │   ├── [WebpartName].module.scss
        │   └── [WebpartName]Component.tsx
        ├── loc/
        │   ├── de-de.js
        │   ├── en-us.js
        │   └── mystrings.d.ts
        ├── [WebpartName]WebPart.manifest.json
        ├── [WebpartName]WebPart.tsx
        └── I[WebpartName]ComponentProperties.ts
```

### Wichtige Regeln Ordnerstruktur
- Ordner immer **camelCase**: `userProfileComponent/`, `stateModels/`, `redux/`
- Dateien immer **PascalCase**: `UserState.ts`, `LoggingService.ts`
- Jede Komponente bekommt ihren **eigenen Unterordner** in `components/`
- `constants/`, `redux/`, `services/`, `stateModels/` liegen **direkt unter `src/`** (nicht unter webparts)

---

## 3. Naming Conventions

### Dateien
```
UserState.ts                  ← PascalCase
UserStateReducer.ts           ← PascalCase + Suffix
UserService.ts                ← PascalCase + Suffix
IUserComponentProperties.ts   ← I-Prefix + PascalCase
ApiExplorer.module.scss       ← PascalCase + .module.scss
```

### Interfaces
```typescript
export interface IApiExplorerComponentProperties { ... }
//               ↑ immer I-Prefix + PascalCase
```

### State-Klassen (PascalCase Properties)
```typescript
export class UserState {
  public IsLoading: boolean;      // ← PascalCase Properties
  public GraphUser: User;
  public SharePointUserDisplayName: string;
}
```

### Redux Actions (UPPER_SNAKE_CASE)
```typescript
export const { START_LOADING_USER, LOADING_USER } = userSlice.actions;
//              ↑ immer UPPER_SNAKE_CASE
```

### Funktionen & Methoden (camelCase)
```typescript
const getCurrentUser = async (): Promise<void> => { ... }
public static async getUserGroups(commonsState: CommonsState): Promise<...> { ... }
```

### Konstanten (PascalCase Objekt, UPPER für primitive)
```typescript
export const GraphSelectFields = { User: [...], Group: [...] };
export const MAX_RETRIES = 3;
```

### Variablen (camelCase, nie Abkürzungen)
```typescript
const commonsState = ...   // ✓
const cs = ...             // ✗
const e = ...              // ✗  
const error = ...          // ✓
```

---

## 4. State Models (`src/stateModels/`)

Jedes Feature bekommt eine eigene State-Klasse. Keine Interfaces, nur Klassen mit Konstruktor-Initialisierung.

```typescript
// src/stateModels/UserState.ts
import { User } from '@microsoft/microsoft-graph-types';

export class UserState {
  public IsLoading: boolean;
  public GraphUser: User;
  public SharePointUserDisplayName: string;

  constructor() {
    this.IsLoading = true;
    this.GraphUser = undefined;
    this.SharePointUserDisplayName = '';
  }
}
```

**Regeln:**
- Dateiname = Klassenname (`UserState.ts` → `export class UserState`)
- Properties: `public` + **PascalCase**
- Constructor setzt alle Defaults
- `IsLoading: true` als Standard (zeigt Spinner beim Start)

---

## 5. CommonsState — Pflichtbestandteil

Jedes Projekt braucht einen `CommonsState` für globale Verbindungen und Fehlerzustand:

```typescript
// src/stateModels/CommonsState.ts
import { SPFI } from '@pnp/sp';
import { GraphFI } from '@pnp/graph';
import { WebPartContext } from '@microsoft/sp-webpart-base';

export class CommonsState {
  public SharepointConnection: SPFI;
  public GraphConnection: GraphFI;
  public Context: WebPartContext;
  public IsInitialLoading: boolean;
  public HasAppError: boolean;

  constructor() {
    this.SharepointConnection = undefined;
    this.GraphConnection = undefined;
    this.Context = undefined;
    this.IsInitialLoading = true;
    this.HasAppError = false;
  }
}
```

---

## 6. Redux Reducers (`src/redux/reducers/`)

**Redux Toolkit `createSlice()`** — kein altes Redux.

```typescript
// src/redux/reducers/UserStateReducer.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserState } from '../../stateModels/UserState';
import { User } from '@microsoft/microsoft-graph-types';

const userSlice = createSlice({
  name: 'user',
  initialState: new UserState(),
  reducers: {
    START_LOADING_USER(state: UserState) {
      return { ...state, IsLoading: true };
    },
    LOADING_USER(state: UserState, action: PayloadAction<{ GraphUser: User; SharePointUserDisplayName: string }>) {
      return {
        ...state,
        GraphUser: action.payload.GraphUser,
        SharePointUserDisplayName: action.payload.SharePointUserDisplayName,
        IsLoading: false
      };
    }
  }
});

export default userSlice;
export const { START_LOADING_USER, LOADING_USER } = userSlice.actions;
```

**Regeln:**
- Dateiname: `[Feature]StateReducer.ts`
- Action-Namen: UPPER_SNAKE_CASE
- State immer mit Spread kopieren: `{ ...state, ... }`
- START-Action setzt `IsLoading: true`, Completion-Action setzt `IsLoading: false`
- `initialState: new [Feature]State()` — immer den Konstruktor nutzen

### CommonsStateReducer — Pflichtstruktur
```typescript
// Actions: LOADING_COMMONS, LOADING_COMMONS_DONE, ENABLE_ERROR
const commonsSlice = createSlice({
  name: 'commons',
  initialState: new CommonsState(),
  reducers: {
    LOADING_COMMONS(state, action: PayloadAction<IWebPartComponentProperties>) {
      return { ...state, SharepointConnection: spfi().using(SPFx(action.payload.Context)), ... };
    },
    LOADING_COMMONS_DONE(state) {
      return { ...state, IsInitialLoading: false };
    },
    ENABLE_ERROR(state) {
      return { ...state, HasAppError: true };
    }
  }
});
```

### RootReducer
```typescript
// src/redux/reducers/RootReducer.ts
import { combineReducers } from '@reduxjs/toolkit';
import commonsSlice from './CommonsStateReducer';
import userSlice from './UserStateReducer';

const RootReducer = combineReducers({
  commonsState: commonsSlice.reducer,
  userState: userSlice.reducer,
});

export default RootReducer;
```

### Store
```typescript
// src/redux/Store.ts
import { configureStore } from '@reduxjs/toolkit';
import { thunk } from 'redux-thunk';
import RootReducer from './reducers/RootReducer';

const store = configureStore({
  reducer: RootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk)
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
```

---

## 7. Services (`src/services/`)

Services sind Klassen mit **static async Methoden**. Kein Instanziieren, kein Redux — nur Datenabruf.

```typescript
// src/services/UserService.ts
import { CommonsState } from '../stateModels/CommonsState';
import { User } from '@microsoft/microsoft-graph-types';
import '@pnp/graph/users';

export class UserService {
  public static async getCurrentUser(
    commonsState: CommonsState
  ): Promise<{ GraphUser: User; SharePointUserDisplayName: string }> {
    const graphUser: User = await commonsState.GraphConnection.me();
    const spUser = await commonsState.SharepointConnection.web.currentUser();
    return {
      GraphUser: graphUser,
      SharePointUserDisplayName: spUser.Title
    };
  }
}
```

**Regeln:**
- Methoden: `get`-Prefix (`getCurrentUser`, nicht `loadUser` oder `fetchUser`)
- Parameter immer `commonsState: CommonsState` für Verbindungszugriff
- Rückgabe: **Plain Data Objects**, nie Redux-Dispatches
- Error-Handling **nicht** im Service — Fehler nach oben werfen

### LoggingService — Pflichtbestandteil
```typescript
// src/services/LoggingService.ts
import { SpFxCoreLoggingService } from 'glb-sp-fx-core/lib/services/spFxCore/spfxCoreLoggingService/SpFxCoreLoggingService';
import store from '../redux/Store';
import { ENABLE_ERROR } from '../redux/reducers/CommonsStateReducer';

const coreLoggingService = new SpFxCoreLoggingService();

export class LoggingService {
  public static handleError(error: Error, context: string): void {
    coreLoggingService.handleError(error, context);
    store.dispatch(ENABLE_ERROR());
  }
}
```

---

## 8. WebPart (`[Name]WebPart.tsx`)

```typescript
// src/webparts/gamePart/GamePartWebPart.tsx
import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { Provider } from 'react-redux';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import store, { AppDispatch, RootState } from '../../redux/Store';
import { GamePartComponent } from './components/GamePartComponent';
import { IGamePartComponentProperties } from './IGamePartComponentProperties';

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default class GamePartWebPart extends BaseClientSideWebPart<Record<string, never>> {
  protected async onInit(): Promise<void> {
    return super.onInit();
  }

  public render(): void {
    const element: React.ReactElement<IGamePartComponentProperties> = React.createElement(
      GamePartComponent,
      { Context: this.context }
    );
    ReactDom.render(<Provider store={store}>{element}</Provider>, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }
}
```

**Regeln:**
- Dateiendung: `.tsx` (nicht `.ts`)
- `useAppDispatch` und `useAppSelector` werden **hier exportiert** und in Komponenten importiert
- Props Interface: `Record<string, never>` wenn WebPart selbst keine Properties hat
- Redux `Provider` wrrapt immer die Root-Komponente
- **Kein** Property-Pane Code wenn nicht gebraucht

---

## 9. Komponenten-Architektur

### Props Interface
```typescript
// src/webparts/gamePart/IGamePartComponentProperties.ts
import { WebPartContext } from '@microsoft/sp-webpart-base';

export interface IGamePartComponentProperties {
  Context: WebPartContext;
}
```

### Root-Komponente (Single Responsibility: Init + Routing)
```typescript
// src/webparts/gamePart/components/GamePartComponent.tsx
import * as React from 'react';
import { MessageBar, MessageBarType, Spinner, SpinnerSize } from '@fluentui/react';
import { useAppDispatch, useAppSelector } from '../GamePartWebPart';
import { CommonsState } from '../../../stateModels/CommonsState';
import { LOADING_COMMONS, LOADING_COMMONS_DONE } from '../../../redux/reducers/CommonsStateReducer';
import { IGamePartComponentProperties } from '../IGamePartComponentProperties';
import { SpFxCoreCommonService } from 'glb-sp-fx-core/lib/services/spFxCore/spfxCoreCommonService/SpFxCoreCommonService';
import styles from './GamePart.module.scss';

const commonService = new SpFxCoreCommonService();

export const GamePartComponent: React.FunctionComponent<IGamePartComponentProperties> = (properties) => {
  const dispatch = useAppDispatch();
  const commonsState: CommonsState = useAppSelector(state => state.commonsState);

  React.useEffect(() => {
    dispatch(LOADING_COMMONS(properties));
  }, []);

  React.useEffect(() => {
    if (commonService.isUndefinedOrNull(commonsState.SharepointConnection) ||
        commonService.isUndefinedOrNull(commonsState.GraphConnection)) return;
    dispatch(LOADING_COMMONS_DONE());
  }, [commonsState.SharepointConnection, commonsState.GraphConnection]);

  if (commonsState.HasAppError) {
    return <MessageBar messageBarType={MessageBarType.error}>Ein Fehler ist aufgetreten.</MessageBar>;
  }

  if (commonsState.IsInitialLoading) {
    return <Spinner size={SpinnerSize.large} />;
  }

  return (
    <section className={styles.gamePart}>
      {/* Feature-Komponenten hier einbinden */}
    </section>
  );
};
```

### Feature-Komponenten (Single Responsibility: 1 Feature)
```typescript
// src/webparts/gamePart/components/userProfileComponent/UserProfileComponent.tsx
import * as React from 'react';
import { Spinner, SpinnerSize } from '@fluentui/react';
import { useAppDispatch, useAppSelector } from '../../GamePartWebPart';
import { CommonsState } from '../../../../stateModels/CommonsState';
import { UserState } from '../../../../stateModels/UserState';
import { UserService } from '../../../../services/UserService';
import { LoggingService } from '../../../../services/LoggingService';
import { START_LOADING_USER, LOADING_USER } from '../../../../redux/reducers/UserStateReducer';

export const UserProfileComponent: React.FunctionComponent = () => {
  const dispatch = useAppDispatch();
  const commonsState: CommonsState = useAppSelector(state => state.commonsState);
  const userState: UserState = useAppSelector(state => state.userState);

  const getCurrentUser = async (): Promise<void> => {
    dispatch(START_LOADING_USER());
    dispatch(LOADING_USER(await UserService.getCurrentUser(commonsState)));
  };

  React.useEffect(() => {
    getCurrentUser().catch(async (error: Error) =>
      LoggingService.handleError(error, 'UserProfileComponent:')
    );
  }, []);

  if (userState.IsLoading) {
    return <Spinner size={SpinnerSize.large} />;
  }

  return (
    <div>
      <h3>{userState.GraphUser?.displayName}</h3>
    </div>
  );
};
```

**Regeln:**
- `React.FunctionComponent` (nicht `React.FC`)
- Keine Props wenn nicht gebraucht: `React.FunctionComponent = () => {}`
- **Kein try/catch** — `.catch()` außerhalb von useEffect
- **Immer Spinner** bei `state.IsLoading === true`
- Komponenten sind **stateless** — alles aus Redux
- `useEffect` mit leerem Array `[]` = einmaliger Load beim Mount

---

## 10. glb-sp-fx-core — Pflichtintegration

```typescript
// Utility-Checks
import { SpFxCoreCommonService } from 'glb-sp-fx-core/lib/services/spFxCore/spfxCoreCommonService/SpFxCoreCommonService';
const commonService = new SpFxCoreCommonService();
commonService.isUndefinedOrNull(value)  // prüft auf undefined/null

// Logging/Error
import { SpFxCoreLoggingService } from 'glb-sp-fx-core/lib/services/spFxCore/spfxCoreLoggingService/SpFxCoreLoggingService';
const coreLoggingService = new SpFxCoreLoggingService();
coreLoggingService.handleError(error, 'KomponentenName:')
```

**config/config.json** — Localized Resources eintragen:
```json
{
  "localizedResources": {
    "GamePartWebPartStrings": "lib/webparts/gamePart/loc/{locale}.js",
    "GLBSpFxCoreLibraryStrings": "node_modules/glb-sp-fx-core/lib/loc/{locale}.js"
  }
}
```

---

## 11. Import/Export Muster

### Komponenten
```typescript
export const UserProfileComponent: React.FunctionComponent = () => { ... };
// Named Export, kein default
```

### State Models & Services
```typescript
export class UserState { ... }
export class UserService { ... }
// Named Export, kein default
```

### Redux Slices
```typescript
export default userSlice;                            // default für den Reducer
export const { START_LOADING_USER, LOADING_USER } = userSlice.actions;  // named für Actions
```

### Relative Imports in Komponenten
```typescript
import { useAppDispatch, useAppSelector } from '../../GamePartWebPart';    // WebPart Hooks
import { CommonsState } from '../../../../stateModels/CommonsState';       // State Models
import { UserService } from '../../../../services/UserService';            // Services
import { LOADING_USER } from '../../../../redux/reducers/UserStateReducer'; // Actions
```

### PnP Imports (Side-Effect Imports)
```typescript
import '@pnp/sp/webs';
import '@pnp/sp/sites';
import '@pnp/sp/lists';
import '@pnp/graph/users';
import { spfi, SPFx as SPSPFx } from '@pnp/sp';
import { graphfi, SPFx as GraphSPFx } from '@pnp/graph';
import { SPFI } from '@pnp/sp';
import { GraphFI } from '@pnp/graph';
```

---

## 12. Constants (`src/constants/`)

```typescript
// src/constants/GraphQueryConstants.ts
export const GraphSelectFields = {
  User: ['displayName', 'mail', 'jobTitle', 'department'],
  Group: ['id', 'displayName']
};

// src/constants/SpQueryConstants.ts
export const SpListSelectFields = {
  List: ['Id', 'Title', 'ItemCount', 'BaseTemplate']
};

export const buildSpListFilter = (hidden: boolean, baseTemplate?: number): string => {
  let filter = `Hidden eq ${hidden}`;
  if (baseTemplate !== undefined) filter += ` and BaseTemplate eq ${baseTemplate}`;
  return filter;
};
```

---

## 13. Lokalisierung (`loc/`)

```typescript
// loc/mystrings.d.ts
declare interface IGamePartWebPartStrings {
  AppLocalEnvironmentSharePoint: string;
  General: {
    LoadingError: string;
  };
}
declare module 'GamePartWebPartStrings' {
  const strings: IGamePartWebPartStrings;
  export = strings;
}
```

```javascript
// loc/en-us.js
define([], function() {
  return {
    AppLocalEnvironmentSharePoint: 'Running in SharePoint (local)',
    General: {
      LoadingError: 'An error occurred while loading.'
    }
  };
});
```

```javascript
// loc/de-de.js — IMMER auch Deutsch anlegen
define([], function() {
  return {
    AppLocalEnvironmentSharePoint: 'Läuft in SharePoint (lokal)',
    General: {
      LoadingError: 'Beim Laden ist ein Fehler aufgetreten.'
    }
  };
});
```

---

## 14. SCSS Module

```scss
/* [WebpartName].module.scss */
@import '~@fluentui/react/dist/sass/References.scss';

.gamePart {
  font-family: $ms-font-family-fallbacks;
  color: "[theme:bodyText, default: #323130]";
  
  .container { ... }
  .title { ... }
}
```

```typescript
import styles from './GamePart.module.scss';
// Verwendung:
<div className={styles.gamePart}>
```

---

## 15. tsconfig.json

```json
{
  "extends": "./node_modules/@microsoft/rush-stack-compiler-5.3/includes/tsconfig-web.json",
  "compilerOptions": {
    "target": "es5",
    "module": "esnext",
    "jsx": "react",
    "declaration": true,
    "sourceMap": true,
    "experimentalDecorators": true,
    "skipLibCheck": true,
    "outDir": "lib",
    "noImplicitAny": true,
    "strictNullChecks": false
  }
}
```

---

## 16. Datenfluss — Der goldene Pfad

```
WebPart.onInit()
  → dispatch(LOADING_COMMONS(properties))     ← PnP Verbindungen aufbauen
  → commonsState.SharepointConnection gesetzt
  → dispatch(LOADING_COMMONS_DONE())          ← IsInitialLoading = false
  → Root-Komponente rendert Feature-Komponenten

FeatureComponent.useEffect([])
  → dispatch(START_LOADING_[FEATURE]())       ← IsLoading = true → Spinner
  → FeatureService.getData(commonsState)      ← API-Call
  → dispatch(LOADING_[FEATURE](data))         ← IsLoading = false → Daten
  
Fehler:
  .catch((error) => LoggingService.handleError(error, 'KomponentenName:'))
  → dispatch(ENABLE_ERROR())
  → commonsState.HasAppError = true
  → Root-Komponente zeigt MessageBar
```

---

## 17. Checklist Neues Projekt

- [ ] `npm install @reduxjs/toolkit react-redux redux-thunk @pnp/sp @pnp/graph @microsoft/microsoft-graph-types glb-sp-fx-core`
- [ ] `src/constants/` anlegen mit Graph- und SP-Query-Konstanten
- [ ] `src/stateModels/CommonsState.ts` anlegen
- [ ] `src/stateModels/[Feature]State.ts` für jedes Feature
- [ ] `src/redux/reducers/CommonsStateReducer.ts` anlegen
- [ ] `src/redux/reducers/[Feature]StateReducer.ts` für jedes Feature
- [ ] `src/redux/reducers/RootReducer.ts` alle Slices kombinieren
- [ ] `src/redux/Store.ts` mit Thunk-Middleware
- [ ] `src/services/LoggingService.ts` mit glb-sp-fx-core
- [ ] `src/services/[Feature]Service.ts` für jedes Feature
- [ ] WebPart auf `.tsx` umbenennen, Provider + useAppDispatch/Selector exportieren
- [ ] `IWebPartComponentProperties.ts` Interface anlegen
- [ ] Root-Komponente mit CommonsState-Init-Logik
- [ ] Feature-Komponenten je in eigenem Unterordner
- [ ] `loc/de-de.js` anlegen
- [ ] `config/config.json` mit `GLBSpFxCoreLibraryStrings` erweitern
