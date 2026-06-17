# SPFx Golden Standard — Projektaufbau, Konventionen & Lernprinzipien

Dieses Dokument ist der verbindliche Standard für alle SPFx-Projekte. Er basiert auf dem `SPFX-test`-Referenzprojekt, dem CAR-Muster (internes Firmenreferenzprojekt) und den Unternehmensanforderungen.

**Wichtig:** Dieser Standard ist gleichzeitig ein Lernleitfaden. Er erklärt nicht nur das *Was*, sondern auch das *Warum* — damit du wie ein echter Entwickler denkst, nicht nur Muster kopierst.

---

## 0. Zusammenarbeit & Lernprinzipien

### Unsere Arbeitsweise

Du bist der Entwickler. Ich bin dein Senior Developer und Mentor.

Das bedeutet konkret:
- **Du schreibst den Code.** Ich erkläre dir was zu tun ist, du setzt es um.
- **Ich erkläre das Warum.** Bevor wir etwas implementieren, verstehst du warum wir es so machen.
- **Wir gehen in der richtigen Reihenfolge vor.** Wie ein echter Entwickler — von der Architektur zur Implementierung.
- **Kein Vibe-Coding.** Nichts wird umgesetzt, was du nicht nachvollziehen kannst.
- **Fehler sind Lernmöglichkeiten.** Wenn etwas nicht funktioniert, analysieren wir gemeinsam warum.

### Wie wir Entscheidungen treffen

Bevor wir Code schreiben, stellen wir uns immer:
1. **Was** wollen wir erreichen?
2. **Warum** machen wir es so (und nicht anders)?
3. **Welcher** Teil des Golden Standards gilt hier?

### Qualitätsmaßstab

Wir arbeiten nach Firmenkonventionen und Best Practices — kein "es funktioniert irgendwie". Jede Zeile Code muss:
- Dem Naming-Standard entsprechen
- Die richtige Schicht (Service / Reducer / Komponente) nutzen
- Wartbar und lesbar sein, als würde ein Kollege den Code reviewen

---

## 1. Tech Stack

| Paket | Version |
|---|---|
| `@microsoft/sp-*` | **1.21.1** |
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

### devDependencies (Build-Tools)

| Paket | Version |
|---|---|
| `@microsoft/sp-build-web` | 1.21.1 |
| `@microsoft/sp-module-interfaces` | 1.21.1 |
| `@microsoft/rush-stack-compiler-5.3` | 0.1.0 |
| `@microsoft/eslint-config-spfx` | 1.21.1 |
| `@microsoft/eslint-plugin-spfx` | 1.21.1 |
| `@rushstack/eslint-config` | 4.0.1 |
| `@types/react` | 17.0.45 |
| `@types/react-dom` | 17.0.17 |
| `@types/webpack-env` | ~1.15.2 |
| `eslint` | 8.57.1 |
| `eslint-plugin-react-hooks` | 4.3.0 |
| `gulp` | 4.0.2 |
| `typescript` | ~5.3.3 |
| `ajv` | ^8.20.0 |

---

## 2. Ordner- und Dateistruktur

```
src/
├── constants/
│   ├── GraphQueryConstants.ts
│   └── SpQueryConstants.ts
├── interfaces/                         ← Daten-Interfaces (keine State-Klassen)
│   ├── IGroupItem.ts
│   └── ISpListInfo.ts
├── redux/
│   ├── reducers/
│   │   ├── CommonsStateReducer.ts
│   │   ├── RootReducer.ts
│   │   └── [Feature]StateReducer.ts
│   └── Store.ts
├── services/
│   ├── LoggingService.ts
│   └── [Feature]Service.ts
├── stateModels/                        ← State-Klassen mit Konstruktor
│   ├── CommonsState.ts
│   └── [Feature]State.ts
└── webparts/
    └── [webpartName]/                  ← camelCase
        ├── components/
        │   ├── [featureName]Component/     ← camelCase Ordner
        │   │   └── [Feature]Component.tsx  ← PascalCase Datei
        │   ├── [WebpartName].module.scss   ← nach App benannt
        │   └── [WebpartName]Component.tsx  ← Root-Komponente
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
- `constants/`, `interfaces/`, `redux/`, `services/`, `stateModels/` liegen **direkt unter `src/`**
- `interfaces/` für Daten-Interfaces (z.B. `IGroupItem`), `stateModels/` für Redux-State-Klassen

---

## 3. Naming Conventions

### Dateien
```
UserState.ts                  ← PascalCase
UserStateReducer.ts           ← PascalCase + Suffix
UserService.ts                ← PascalCase + Suffix
IUserComponentProperties.ts   ← I-Prefix + PascalCase
GameSnake.module.scss          ← PascalCase (nach App benannt)
IGroupItem.ts                 ← I-Prefix für Daten-Interfaces
```

### Interfaces
```typescript
export interface IGameSnakeComponentProperties { ... }
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

### Funktionen & Methoden
```typescript
// Public Service-Methoden: get-Prefix, camelCase
public static async getCurrentUser(commonsState: CommonsState): Promise<...> { ... }

// Private Service-Methoden: _ Prefix + camelCase
private static async _parseUserResponse(user: User): Promise<...> { ... }

// Lokale Funktionen in Komponenten: camelCase
const getCurrentUser = async (): Promise<void> => { ... }
```

### Konstanten
```typescript
export const GraphSelectFields = { User: [...], Group: [...] };  // PascalCase Objekt
export const MAX_RETRIES = 3;                                    // UPPER für primitive
```

### Variablen (camelCase, niemals Abkürzungen)
```typescript
const commonsState = ...   // ✓
const cs = ...             // ✗ — zu kurz, unklar
const e = ...              // ✗ — nie
const error = ...          // ✓
const group = ...          // ✓ (nicht g => ...)
const list = ...           // ✓ (nicht l => ...)
```

**Regel:** Kein Variablenname kürzer als 3 Zeichen. Ausnahme: `id` als etablierte Konvention.

### Parameter-Benennung in Komponenten
```typescript
// Props-Parameter heißt immer "properties", nie "props"
export const GameSnakeComponent: React.FunctionComponent<IGameSnakeComponentProperties> = (properties) => {
  dispatch(LOADING_COMMONS(properties));
};

// Komponenten ohne Props bekommen keinen Parameter
export const UserProfileComponent: React.FunctionComponent = () => {
```

---

## 4. State Models (`src/stateModels/`)

Jedes Feature bekommt eine eigene State-Klasse. **Keine Interfaces** — nur Klassen mit Konstruktor-Initialisierung.

```typescript
// src/stateModels/UserState.ts
import { User } from '@microsoft/microsoft-graph-types';

export class UserState {
  public IsLoading: boolean;
  public GraphUser: User;
  public SharePointUserDisplayName: string;

  constructor() {
    this.IsLoading = true;           // ← immer true beim Start = Spinner
    this.GraphUser = undefined;
    this.SharePointUserDisplayName = '';
  }
}
```

**Regeln:**
- Dateiname = Klassenname (`UserState.ts` → `export class UserState`)
- Properties: `public` + **PascalCase**
- Constructor setzt alle Defaults
- `IsLoading: true` als Standard — zeigt Spinner solange Daten nicht geladen
- Existierende API-Typen nutzen (`User` aus `@microsoft/microsoft-graph-types`), keine eigenen Typen nachbauen

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
  public Context: WebPartContext;   // Hinweis: kann auch "any" sein wenn TS4023-Fehler auftritt
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

**Warum CommonsState?** Sp/Graph-Verbindungen werden einmal im WebPart erstellt und müssen dann in allen Services verfügbar sein. Redux ist der einzige globale Speicher — deshalb landen die Verbindungen im CommonsState.

---

## 6. Redux Reducers (`src/redux/reducers/`)

**Redux Toolkit `createSlice()`** — kein altes Redux, keine `switch`-Statements.

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
- State immer mit Spread kopieren: `{ ...state, ... }` — nie direkt mutieren
- START-Action setzt `IsLoading: true`, Completion-Action setzt `IsLoading: false`
- `initialState: new [Feature]State()` — immer den Konstruktor nutzen

### CommonsStateReducer — Pflichtstruktur
```typescript
const commonsSlice = createSlice({
  name: 'commons',
  initialState: new CommonsState(),
  reducers: {
    LOADING_COMMONS(state, action: PayloadAction<IWebPartComponentProperties>) {
      return {
        ...state,
        SharepointConnection: spfi().using(SPFx(action.payload.Context)),
        GraphConnection: graphfi().using(SPFx(action.payload.Context)),
        Context: action.payload.Context,
      };
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
- Public Methoden: `get`-Prefix (`getCurrentUser`, nicht `loadUser` oder `fetchUser`)
- Private Methoden: `_` Prefix (`_parseUserResponse`)
- Parameter immer `commonsState: CommonsState` für Verbindungszugriff
- Rückgabe: **Plain Data Objects**, nie Redux-Dispatches
- **Kein Error-Handling im Service** — Fehler nach oben werfen, Komponente fängt sie
- Existierende API-Typen nutzen (`User`, `Group`, `IWebInfo`, `IListInfo` etc.) — nie eigene Typen für API-Responses nachbauen

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
// src/webparts/gameSnake/GameSnakeWebPart.tsx
import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { Provider } from 'react-redux';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import store, { AppDispatch, RootState } from '../../redux/Store';
import { GameSnakeComponent } from './components/GameSnakeComponent';
import { IGameSnakeComponentProperties } from './IGameSnakeComponentProperties';

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default class GameSnakeWebPart extends BaseClientSideWebPart<Record<string, never>> {
  protected async onInit(): Promise<void> {
    return super.onInit();
  }

  public render(): void {
    const element: React.ReactElement<IGameSnakeComponentProperties> = React.createElement(
      GameSnakeComponent,
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
- `useAppDispatch` und `useAppSelector` werden **hier exportiert** und in Komponenten importiert (SPFx-Compiler-Limitierung — das ist kein Schönheitsfehler, sondern Pflicht)
- Props Interface: `Record<string, never>` wenn WebPart selbst keine Properties hat
- Redux `Provider` wrrapt immer die Root-Komponente in `render()`
- **Kein** Property-Pane Code wenn nicht gebraucht
- `onInit()` macht nur `super.onInit()` — keine Datenabrufe hier

---

## 9. Komponenten-Architektur

### Props Interface
```typescript
// src/webparts/gameSnake/IGameSnakeComponentProperties.ts
import { WebPartContext } from '@microsoft/sp-webpart-base';

export interface IGameSnakeComponentProperties {
  Context: WebPartContext;
}
```

### Root-Komponente (Single Responsibility: Init + Routing)
```typescript
// src/webparts/gameSnake/components/GameSnakeComponent.tsx
import * as React from 'react';
import { MessageBar, MessageBarType, Spinner, SpinnerSize } from '@fluentui/react';
import { useAppDispatch, useAppSelector } from '../GameSnakeWebPart';
import { CommonsState } from '../../../stateModels/CommonsState';
import { LOADING_COMMONS, LOADING_COMMONS_DONE } from '../../../redux/reducers/CommonsStateReducer';
import { IGameSnakeComponentProperties } from '../IGameSnakeComponentProperties';
import { SpFxCoreCommonService } from 'glb-sp-fx-core/lib/services/spFxCore/spfxCoreCommonService/SpFxCoreCommonService';
import styles from './GameSnake.module.scss';

const commonService = new SpFxCoreCommonService();

export const GameSnakeComponent: React.FunctionComponent<IGameSnakeComponentProperties> = (properties) => {
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
    <section className={styles.gameSnake}>
      {/* Feature-Komponenten hier einbinden */}
    </section>
  );
};
```

### Feature-Komponenten (Single Responsibility: 1 Feature)
```typescript
// src/webparts/gameSnake/components/userProfileComponent/UserProfileComponent.tsx
import * as React from 'react';
import { Spinner, SpinnerSize } from '@fluentui/react';
import { useAppDispatch, useAppSelector } from '../../GameSnakeWebPart';
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
- `React.FunctionComponent` (nicht `React.FC` — das ist ein Team-Standard)
- Keine Props wenn nicht gebraucht: `React.FunctionComponent = () => {}`
- Props-Parameter heißt `properties`, nie `props`
- **Kein try/catch** — `.catch()` außerhalb von useEffect, immer mit `LoggingService`
- **Immer Spinner** bei `state.IsLoading === true`
- Komponenten sind **stateless** — alle Daten kommen aus Redux
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
    "GameSnakeWebPartStrings": "lib/webparts/gameSnake/loc/{locale}.js",
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
import { useAppDispatch, useAppSelector } from '../../GameSnakeWebPart';    // WebPart Hooks
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
declare interface IGameSnakeWebPartStrings {
  AppLocalEnvironmentSharePoint: string;
  General: {
    LoadingError: string;
  };
}
declare module 'GameSnakeWebPartStrings' {
  const strings: IGameSnakeWebPartStrings;
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
/* GameSnake.module.scss — nach App benannt (nicht nach Komponente) */
@import '~@fluentui/react/dist/sass/References.scss';

.gameSnake {
  font-family: $ms-font-family-fallbacks;
  color: "[theme:bodyText, default: #323130]";
  
  .container { ... }
  .title { ... }
}
```

```typescript
import styles from './GameSnake.module.scss';
// Verwendung:
<div className={styles.gameSnake}>
```

---

## 15. Sicherheit (Security)

### XSS-Schutz
Externe Daten (API-Antworten, Benutzereingaben) **immer** escapen bevor sie ins DOM kommen:
```typescript
import { escape } from '@microsoft/sp-lodash-subset';
<div>{escape(userDisplayName)}</div>
```

### Principle of Least Privilege
API-Berechtigungen so minimal wie möglich halten:
```json
// config/package-solution.json
"webApiPermissionRequests": [
  {
    "resource": "Microsoft Graph",
    "scope": "User.Read"
  }
]
```

`User.Read` erlaubt: Name, Email, Basic Info des aktuellen Benutzers lesen.  
Nur Berechtigungen anfordern, die tatsächlich gebraucht werden.

### SPFx-Authentifizierung
Das SPFx-Framework übernimmt OAuth-Token automatisch — kein manuelles Token-Management:
```typescript
const graph = graphfi().using(GraphSPFx(this.context));
// this.context enthält den authentifizierten Benutzer — PnP nutzt das intern
```

---

## 16. tsconfig.json

```json
{
  "extends": "./node_modules/@microsoft/rush-stack-compiler-5.3/includes/tsconfig-web.json",
  "compilerOptions": {
    "target": "es5",
    "forceConsistentCasingInFileNames": true,
    "module": "esnext",
    "moduleResolution": "node",
    "jsx": "react",
    "declaration": true,
    "sourceMap": true,
    "experimentalDecorators": true,
    "skipLibCheck": true,
    "outDir": "lib",
    "inlineSources": false,
    "noImplicitAny": true,
    "strictNullChecks": false,
    "typeRoots": [
      "./node_modules/@types",
      "./node_modules/@microsoft"
    ],
    "types": [
      "webpack-env"
    ],
    "lib": [
      "es5",
      "dom",
      "es2015.collection",
      "es2015.promise"
    ]
  },
  "include": [
    "src/**/*.ts",
    "src/**/*.tsx"
  ]
}
```

---

## 17. gulpfile.js

```javascript
'use strict';

const build = require('@microsoft/sp-build-web');

build.addSuppression(`Warning - [sass] The local CSS class 'ms-Grid' is not camelCase and will not be type-safe.`);

var getTasks = build.rig.getTasks;
build.rig.getTasks = function () {
  var result = getTasks.call(build.rig);
  result.set('serve', result.get('serve-deprecated'));
  return result;
};

build.initialize(require('gulp'));
```

**Wichtig:** Der `serve-deprecated`-Block ist zwingend — ohne ihn existiert `gulp serve` nicht.

---

## 18. config/serve.json

```json
{
  "$schema": "https://developer.microsoft.com/json-schemas/core-build/serve.schema.json",
  "port": 4321,
  "https": true,
  "initialPage": "https://{tenant}.sharepoint.com/sites/{site}/_layouts/15/workbench.aspx",
  "api": {
    "port": 5432,
    "entryPath": "node_modules/@microsoft/sp-webpart-workbench/lib/api/"
  }
}
```

**Wichtig:** Schema muss `core-build/serve.schema.json` sein (nicht `spfx-build/spfx-serve.schema.json`) — nur dann öffnet `gulp serve` die URL ohne den `?debugManifestsFile=`-Parameter.

---

## 19. config/sass.json

```json
{
  "$schema": "https://developer.microsoft.com/json-schemas/core-build/sass.schema.json"
}
```

---

## 20. package.json scripts

```json
"scripts": {
  "build": "gulp bundle",
  "clean": "gulp clean",
  "test": "gulp test"
}
```

**Kein `serve`-Script** — `gulp serve` direkt im Terminal ausführen.

---

## 21. Datenfluss — Der goldene Pfad

```
WebPart.onInit()
  → super.onInit()  ← nichts weiter hier

WebPart.render()
  → Redux Provider wrrapt Root-Komponente

RootComponent.useEffect([])
  → dispatch(LOADING_COMMONS(properties))     ← PnP Verbindungen aufbauen
  → commonsState.SharepointConnection gesetzt
  → dispatch(LOADING_COMMONS_DONE())          ← IsInitialLoading = false
  → Root-Komponente rendert Feature-Komponenten

FeatureComponent.useEffect([])
  → dispatch(START_LOADING_[FEATURE]())       ← IsLoading = true → Spinner
  → FeatureService.getData(commonsState)      ← API-Call, kein Error-Handling hier
  → dispatch(LOADING_[FEATURE](data))         ← IsLoading = false → Daten

Fehler:
  .catch((error) => LoggingService.handleError(error, 'KomponentenName:'))
  → coreLoggingService.handleError(...)
  → dispatch(ENABLE_ERROR())
  → commonsState.HasAppError = true
  → Root-Komponente zeigt MessageBar
```

**Warum FeatureComponents erst nach LOADING_COMMONS_DONE rendern?**  
Die Sub-Komponenten mounten erst wenn `IsInitialLoading === false`. Zu diesem Zeitpunkt sind Sp/Graph garantiert bereit. Kein Guard `if (commonsState.Sp === undefined)` in jeder Feature-Komponente nötig.

---

## 22. Nach Clone — Setup-Schritte

```bash
npm install
gulp trust-dev-cert    # Zertifikat erstellen — bei JEDEM frischen Clone nötig
gulp serve             # Entwicklungsserver starten
```

Das Zertifikat ist in `.gitignore` — es wird nicht ins Repo eingecheckt und muss nach jedem Clone neu erstellt werden.

---

## 23. Checklist Neues Projekt

- [ ] `npm install @reduxjs/toolkit react-redux redux-thunk @pnp/sp @pnp/graph @microsoft/microsoft-graph-types glb-sp-fx-core`
- [ ] `src/constants/` anlegen mit Graph- und SP-Query-Konstanten
- [ ] `src/interfaces/` anlegen für Daten-Interfaces (wenn benötigt)
- [ ] `src/stateModels/CommonsState.ts` anlegen
- [ ] `src/stateModels/[Feature]State.ts` für jedes Feature
- [ ] `src/redux/reducers/CommonsStateReducer.ts` anlegen
- [ ] `src/redux/reducers/[Feature]StateReducer.ts` für jedes Feature
- [ ] `src/redux/reducers/RootReducer.ts` alle Slices kombinieren
- [ ] `src/redux/Store.ts` mit Thunk-Middleware
- [ ] `src/services/LoggingService.ts` mit glb-sp-fx-core
- [ ] `src/services/[Feature]Service.ts` für jedes Feature
- [ ] WebPart auf `.tsx` umbenennen, Provider + useAppDispatch/Selector exportieren
- [ ] `I[WebpartName]ComponentProperties.ts` Interface anlegen
- [ ] Root-Komponente mit CommonsState-Init-Logik
- [ ] Feature-Komponenten je in eigenem Unterordner
- [ ] `loc/de-de.js` anlegen
- [ ] `config/config.json` mit `GLBSpFxCoreLibraryStrings` erweitern
