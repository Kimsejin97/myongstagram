import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    Image,
    Dimensions,
    FlatList
} from "react-native";
import { connect } from 'react-redux';
import { fetchUsers } from '../actions';

import { Container, Content, Icon, Header, Left, Body, Right, Segment, Button } from 'native-base'
import EntypoIcon from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
var { height, width } = Dimensions.get('window');

class ProfileScreen extends Component {
    static navigationOptions = ({ navigation }) => {
      return {
        title: 'MJ-stargram'
      };
    };

    renderSectionOne() {
        return images.map((image, index) => {
            return (
                <View key={index} style={[{ width: (width) / 3 }, { height: (width) / 3 }, { marginBottom: 2 }, index % 3 !== 0 ? { paddingLeft: 2 } : { paddingLeft: 0 }]}>
                    <Image style={{
                        flex: 1,
                        alignSelf: 'stretch',
                        width: undefined,
                        height: undefined,

                    }}
                        source={image}>
                    </Image>
                </View>
            )
        })
    }

      componentDidMount() {
        this.props.fetchUsers();
      }
      renderUsers() {
        if (this.props.users) {
          return this.props.users.map(user => {
            return (
              <View style={styles.card} key={user.id}>
                <Text>{user.username}</Text>
              </View>
            );
          });
        }
      }

    render() {
        return (
            <Container style={styles.container}>
                <Content>
                    <View style={{ paddingTop: 10 }}>

                        {/** User Photo Stats**/}
                        <View style={{ flexDirection: 'row' }}>

                            {/**User photo takes 1/3rd of view horizontally **/}
                            <View
                                style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-start' }}>
                                <Image source={{ uri: 'https://randomuser.me/api/portraits/women/17.jpg' }}
                                    style={{ width: 75, height: 75, borderRadius: 37.5 }} />
                            </View>

                            {/**User Stats take 2/3rd of view horizontally **/}
                            <View style={{ flex: 3 }}>

                                {/** Stats **/}
                                <View
                                    style={{
                                        flexDirection: 'row',
                                        justifyContent: 'space-around',
                                        alignItems: 'flex-end',
                                        paddingTop: 10
                                    }}>
                                    <View style={{ alignItems: 'center' }}>
                                        <Text>20</Text>
                                        <Text style={{ fontSize: 10, color: 'grey' }}>Posts</Text>
                                    </View>
                                    <View style={{ alignItems: 'center' }}>
                                        <Text>205</Text>
                                        <Text style={{ fontSize: 10, color: 'grey' }}>Followers</Text>
                                    </View>
                                    <View style={{ alignItems: 'center' }}>
                                        <Text>167</Text>
                                        <Text style={{ fontSize: 10, color: 'grey' }}>Following</Text>
                                    </View>
                                </View>

                                {/**Edit profile and Settings Buttons **/}
                                <View style={{ flexDirection: 'row', alignItems: 'flex-start', paddingTop: 10 }}>
                                    <View
                                        style={{ flexDirection: 'row' }}>
                                        {/** Edit profile takes up 3/4th **/}
                                        <Button bordered dark
                                            style={{ flex: 3, marginLeft: 10, justifyContent: 'center', height: 30 }}><Text>Edit Profile</Text></Button>
                                    </View>
                                </View>{/**End edit profile**/}
                            
                            </View>
                        </View>
                        <View style={{ paddingBottom: 10 }}>
                            <View style={{ paddingHorizontal: 10 }}>
                                <Text style={{ fontWeight: 'bold' }}>ID: {this.renderUsers()}</Text>
                            </View>
                        </View>
                    </View>

                    <View >
                        <View style={{ flexDirection: 'row', justifyContent: 'space-around', borderTopWidth: 1, borderTopColor: '#eae5e5' }}>
                        </View>
                    </View>

                </Content>
            </Container >
        );
    }
    _showMoreApp = () => {
      this.props.navigation.navigate('Other');
    };

    _signOutAsync = async () => {
      await AsyncStorage.clear();
      this.props.navigation.navigate('Auth');
    };
}
function mapStateToProps(state) {
  return { users: state.users };
}
export default connect(mapStateToProps, { fetchUsers })(ProfileScreen);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    }
});