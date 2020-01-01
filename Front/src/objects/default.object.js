class DefaultObject {
  constructor (props) {
    if(props) {
      this.updateProperty(props);
      this.LanguageContent = {};
      for(const language of ['Vi', 'En']) {
        if(props.hasOwnProperty(language) && props[language].Name) {
          this.LanguageContent[language.toLowerCase()] = props[language];
        }
      }
    }
  }

  updateProperty (props) {
    if(props) {
      for(const prop in props) {
        this[prop] = props[prop]
      }
    }
  }
}

export default DefaultObject;