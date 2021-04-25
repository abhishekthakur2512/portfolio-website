/* Texts Style */

export const name_heading = {
  color: "white",
  margin: "0em",
  marginTop: "1em",
  fontSize: "50px",
  textAlign: "center",
  fontFamily: 'Work Sans'
};

export const designation = {
  textAlign:"center",
  color:"grey", 
  fontSize:"15px"
}

export const contact_logo = {
  marginTop: "50px",
  textAlign: "center",
  marginBottom: "50px"
}

const emptyBackground = {
	border: 'none',
	outline: 'none',
  backgroundColor: 'transparent',
}

export const mute_button = {
  ...emptyBackground,
  cursor: 'pointer',
  align: 'center',
  height: 20
}

export const COLOR_THEME = {
  'THEME_RED': {
    PRIMARY: '#e34660',
    PRIMARY_LIGHT: '',
    PRIMARY_DARK: '',
    SECONDARY: '#810000',
    SECONDARY_LIGHT: '',
    SECONDARY_DARK: '',
    TEXT: '#FFFFFF',
    BACKGROUND: '#1c080b',
    BLACK: '#000B19',
    WHITE: '#FFFFFF'
  }
}

export const GAME_COLOR_SCHEME = COLOR_THEME['THEME_RED'];