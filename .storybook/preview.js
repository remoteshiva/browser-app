
import { withTheme, withProvider } from './decorators'

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
}


export const decorators = [withProvider, withTheme];