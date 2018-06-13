import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  AppRegistry, 
  TextInput,
  Button,
  AsyncStorage
} from 'react-native';

class UselessTextInput extends React.Component {
  render() {
    return (
      <TextInput
        {...this.props}
        editable = {true}
        maxLength = {40}
      />
    );
  }
}

class WriteScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'MJ-stargram',
      headerRight: (
        <Button
          onPress={async () => {
            await AsyncStorage.clear();
            navigation.navigate('Home');
          }} 
          title="Post"
          color="blue"
        />
      )
    };
  };

  constructor(props) {
    super(props);
    this.state = {
      content: 'Please enter post!!!'
    };
  }

  render() {
    return (
      <View style={styles.container}>
      <UselessTextInput
         multiline = {true}
         numberOfLines = {4}
         onChangeText={(content) => this.setState({content})}
         value={this.state.content}
       />
      </View>
    );
  }
}

_showMoreApp = () => {
  this.props.navigation.navigate('Other');
};

_signOutAsync = async () => {
  await AsyncStorage.clear();
  this.props.navigation.navigate('Auth');
};

export default WriteScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  input: {
    alignSelf: "stretch",
    height: 40,
    margin: 20,
    marginBottom: 5,
    marginTop: 5,
    fontSize: 15,
    borderWidth: 1,
    borderColor: 'gray',
    padding: 5
  }
});
