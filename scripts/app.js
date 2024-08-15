const { createApp } = Vue;

createApp({
  data() {
    return {
      fact: '',
      cityName: 'London,Ontario',
      Temperature: '',
      Wind: '',
      Description: '',
      word: '',
      Word: '',
      Phonetic: '',
      PartOfSpeech: '',
      Definition: ''
    };
  },
  computed() {
    this.AddFact();
    this.GetWeatherInfo();
  },
  methods: {
    AddFact() {
      fetch('https://uselessfacts.jsph.pl/api/v2/facts/random')
        .then(response => response.json())
        .then(data => {
          this.fact = data.text;
        });
    },
    GetWeatherInfo() {
      fetch(`https://goweather.herokuapp.com/weather/${this.cityName}`)
        .then(response => response.json())
        .then(data => {
          this.Temperature = data.temperature;
          this.Wind = data.wind;
          this.Description = data.description;
        });
    },
    GetWordData() {
      fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${this.word}`)
        .then(response => response.json())
        .then(data => {
          const entry = data[0];
          this.Word = entry.word;
          this.Phonetic = entry.phonetic;
          this.PartOfSpeech = entry.meanings[0].partOfSpeech;
          this.Definition = entry.meanings[0].definitions[0].definition;
        });
    }
  }
}).mount('#app');
