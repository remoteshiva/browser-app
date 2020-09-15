
import { withTheme, withProvider } from './decorators'
import '../src/assets/styles/styles.css';

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
}

export const decorators = [withProvider, withTheme];