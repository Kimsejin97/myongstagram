import React, { Component } from "react";
import {
    View,
    Text,
    Button,
    StyleSheet,
    ScrollView,
    AsyncStorage
} from "react-native";

import { Container, Content, Icon, Thumbnail, Header, Left, Right, Body } from 'native-base'
import CardComponent from '../CardComponent'
import { connect } from 'react-redux';
import { fetchUsers } from '../actions';

class HomeScreen extends Component {

    static navigationOptions = ({ navigation }) => {
      return {
        title: 'MJ-stargram',
        headerRight: (
          <Button
            onPress={async () => {
              await AsyncStorage.clear();
              navigation.navigate('Auth');
            }} 
            title="Signout"
            color="red"
          />
        ),
      };
    };
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

                    <View style={{ height: 100 }}>
                        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 7 }}>
                            <Text style={{ fontWeight: 'bold' }}>Stories</Text>
                        </View>
                        <View style={{ flex: 3 }}>
                            <ScrollView
                                horizontal={true}
                                showsHorizontalScrollIndicator={false}
                                contentContainerStyle={{
                                    alignItems: 'center',
                                    paddingStart: 5,
                                    paddingEnd: 5
                                }}
                            >
                                <Thumbnail
                                    style={{ marginHorizontal: 5, borderColor: 'pink', borderWidth: 2 }}
                                    source={require('../assets/StoriesHeaderThumbnails/1.jpg')} />
                                <Thumbnail
                                    style={{ marginHorizontal: 5, borderColor: 'pink', borderWidth: 2 }}
                                    source={require('../assets/StoriesHeaderThumbnails/2.jpg')} />
                                <Thumbnail
                                    style={{ marginHorizontal: 5, borderColor: 'pink', borderWidth: 2 }}
                                    source={require('../assets/StoriesHeaderThumbnails/3.jpg')} />
                                <Thumbnail
                                    style={{ marginHorizontal: 5, borderColor: 'pink', borderWidth: 2 }}
                                    source={require('../assets/StoriesHeaderThumbnails/4.jpg')} />

                                <Thumbnail
                                    style={{ marginHorizontal: 5, borderColor: 'pink', borderWidth: 2 }}
                                    source={require('../assets/StoriesHeaderThumbnails/5.jpg')} />
                                <Thumbnail
                                    style={{ marginHorizontal: 5, borderColor: 'pink', borderWidth: 2 }}
                                    source={require('../assets/StoriesHeaderThumbnails/6.jpg')} />
                                <Thumbnail
                                    style={{ marginHorizontal: 5, borderColor: 'pink', borderWidth: 2 }}
                                    source={require('../assets/StoriesHeaderThumbnails/7.jpg')} />
                            </ScrollView>
                        </View>
                    </View>
                    <CardComponent imageSource="1" likes="101" />
                    <CardComponent imageSource="2" likes="201" />
                    <CardComponent imageSource="3" likes="301" />
                </Content>
            </Container>
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

export default connect(mapStateToProps, { fetchUsers })(HomeScreen);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    }
});
