import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <link
            href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&family=Lobster&family=Montserrat&family=Open+Sans&family=Oswald&family=Pacifico&family=Raleway&family=Quicksand&family=Ubuntu&family=Lora&family=Merriweather&family=Nunito&family=Playfair+Display&family=Rubik&family=Source+Sans+Pro&family=Zilla+Slab&family=Baloo&family=Bangers&family=Caveat&family=Courgette&family=Dancing+Script&family=EB+Garamond&family=Fredoka+One&family=Great+Vibes&family=Indie+Flower&family=Josefin+Sans&family=Kalam&family=Kaushan+Script&family=Libre+Baskerville&family=Lobster+Two&family=Maven+Pro&family=Merienda&family=Muli&family=Neuton&family=Oleo+Script&family=Overpass&family=Patua+One&family=Permanent+Marker&family=PT+Serif&family=Quattrocento&family=Raleway+Dots&family=Ranchers&family=Rationale&family=Satisfy&family=Shadows+Into+Light&family=Signika&family=Sriracha&family=Tangerine&family=Titillium+Web&family=Ultra&family=Varela+Round&family=Vollkorn&family=Yatra+One&family=Yellowtail&family=Yeseva+One&family=Bebas+Neue&family=Comfortaa&family=Dosis&family=Exo+2&family=Inconsolata&family=Karla&family=Lato&family=Merriweather+Sans&family=Oxygen&family=Poppins&family=Questrial&family=Righteous&family=Sanchez&family=Spectral&family=Work+Sans&display=swap"
            rel="stylesheet"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
