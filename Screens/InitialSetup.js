//Imports the various components
import Expo from 'expo';
import React from 'react';
import {
  Animated,
  Image,
  Dimensions,
  StyleSheet,
  Text,
  View,
} from 'react-native';

//Defines the constants
const videoSource = require('./BackgroundVideo.mp4'); //WHY WONT U GO WHERE I WANT YOU TO GO
const imageSource = require('./WossLogoWhite.png')

//Defines the initial setup class..
class InitialSetup extends React.Component {
  //Checks if the class has loaded, else it will await the video source and not draw until then
  state = {
    loaded: false,
    backgroundOpacity: new Animated.Value(0),
  }

  async componentWillMount() {
    await Expo.Asset.fromModule(videoSource).downloadAsync();
    this.setState({loaded: true});
  }

  render() {
    if (!this.state.loaded) {
      return <Expo.AppLoading />;
    }
    //When it finishes loading, it fades in the background, and draws the logo and the button to the next screen
    return (
      <View style={styles.container}>
        <View style={styles.background}>
          <Animated.View style={[styles.backgroundViewWrapper, {opacity: this.state.backgroundOpacity}]}>
            <Expo.Video
              source={videoSource}
              style={{width: Dimensions.get('window').width, height: Dimensions.get('window').height}}
              resizeMode="cover"
              repeat={true}
              mute={true}
              onLoad={() => this._fadeInVideo()}
              shouldPlay
              isLooping
            />
          </Animated.View>
        </View>
        <View style={styles.overlay}>
          <Text style={styles.title}>
            button goes here
          </Text>
        </View>
        <View style={styles.logoContainer}>
          <Image
          style={styles.logo}
          source={imageSource}
          />
        </View>
      </View>
    );
  }

  _fadeInVideo = () => {
    setTimeout(() => {
      Animated.spring(this.state.backgroundOpacity, {toValue: 1}).start()
    }, 500);
  }
}
//The various Stylesheets characteristics that were defined above
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
  },
  background: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#000',
  },
  backgroundViewWrapper: {
    ...StyleSheet.absoluteFillObject,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  title: {
    fontSize: 30,
    color: '#fff',
    textAlign: 'center',
    marginTop: 550,
  },
  logoContainer: {
    alignItems: 'center',
    flexGrow: 1,
    justifyContent: 'center',
    marginBottom: 150
  },
  logo: {
    width: 200,
    height: 200
  },
});
export default InitialSetup; //Exports the class!
