import React from 'react';
import {
  AppRegistry,
  StyleSheet,
  ListView,
  Text,
  View
} from 'react-native';

import Row from '../components/Row'
import Header from '../components/Header'
import SectionHeader from '../components/SectionHeader'
import Footer from '../components/Footer'
import demoData from '../data'

export default class SearchScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'MJ-stargram'
    };
  };
  constructor(props) {
    super(props)

    const getSectionData = (dataBlob, sectionId) => dataBlob[sectionId];
    const getRowData = (dataBlob, sectionId, rowId) => dataBlob[`${rowId}`];

    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
      sectionHeaderHasChanged : (s1, s2) => s1 !== s2,
      getSectionData,
      getRowData,
    });

    const { dataBlob, sectionIds, rowIds } = this.formatData(demoData);

    this.state = {
      dataSource: ds.cloneWithRowsAndSections(dataBlob, sectionIds, rowIds)
    }
  }

  formatData(data) {
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

    const dataBlob = {};
    const sectionIds = [];
    const rowIds = [];

    for (let sectionId = 0; sectionId < alphabet.length; sectionId++) {
      const currentChar = alphabet[sectionId];
      const users = data.filter((user) => user.name.first.toUpperCase().indexOf(currentChar) === 0);

      if (users.length > 0) {
        sectionIds.push(sectionId);
        dataBlob[sectionId] = { character: currentChar };
        rowIds.push([]);
        for (let i = 0; i < users.length; i++) {
          const rowId = `${sectionId}:${i}`;
          rowIds[rowIds.length - 1].push(rowId);
          dataBlob[rowId] = users[i];
        }
      }
    }

    return { dataBlob, sectionIds, rowIds };
  }

  render() {
    return (
      <View style={styles.container}>
        <ListView
          style={styles.container}
          dataSource={this.state.dataSource}
          renderRow={(data) => <Row {...data} />}
          renderSeparator={(sectionId, rowId) => <View key={rowId} style={styles.separator} />}
          renderHeader={() => <Header />}
          renderFooter={() => <Footer />}
          renderSectionHeader={(sectionData) => <SectionHeader {...sectionData} />}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
  },
  separator: {
    flex: 1,
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#8E8E8E',
  },
});

AppRegistry.registerComponent('SearchScreen', () => SearchScreen);
