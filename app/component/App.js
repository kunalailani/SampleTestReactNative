import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView, 
  ListView,
  Dimensions,
} from 'react-native';

import { connect } from 'react-redux';
import { getUserProfileData, getUserSliderImages, getGridImages } from '../action';
import { bindActionCreators } from 'redux'
import Swiper from 'react-native-swiper';

var {height, width} = Dimensions.get('window');

const imageWidth = (width/3) - 3;
const imageHeight = (width/3) - 3;


class App extends Component<{}> {
  constructor(props) {
    super(props);    
    this.state = {     
      numberOfLines: 3,      
      readText: 'Read More',
      cardViewHeight: 130
    };
  }  
  
  componentDidMount() {                 
    const { getUserProfileData, getUserSliderImages, getGridImages } = this.props;

    //get user profile data
    getUserProfileData();

    //get slider images
    getUserSliderImages();

    //get grid view images
    getGridImages();
    
  }  
  
  showMoreText = () => {    
    if (this.state.readText == 'Read More') {
        this.setState({readText: 'Read Less'})
        this.setState({cardViewHeight: 280})
        this.setState({numberOfLines: 20})
    } else {
      this.setState({readText: 'Read More'})
      this.setState({cardViewHeight: 130})
      this.setState({numberOfLines: 3})
    }     
  }
  renderGridView = (images) => {
    return (
      <View style={{margin:1, width: imageWidth, height: imageHeight}}>
          <Image source={{uri: images.thumbnail}} style={{width: imageWidth, height: imageWidth}} resizeMode='cover' />         
      </View>
    )
  }  
  render() {
    const { userProfileData, userSliderImages, gridDataSource } = this.props;    
    return (
      <View style={styles.container}>
          {/* Card view section */}          
          <View style={[styles.cardView, {height: this.state.cardViewHeight}]}>
              <Image source={{uri: userProfileData.profileImage}} style={styles.profileImage} resizeMode="cover" />            
              <View style={styles.cardBody}>
                <Text style={styles.title}>
                  {userProfileData.name}
                </Text>
                <Text numberOfLines={this.state.numberOfLines}>
                  {userProfileData.bio}                   
                </Text>
                <Text style={{color: 'blue'}} onPress={this.showMoreText}>{this.state.readText}</Text>
              </View>
          </View>
            {/* Slider Section*/}          
            <Swiper
              dot={<View style={{backgroundColor: 'rgba(255,255,255,.3)', width: 13, height: 13, borderRadius: 7, marginLeft: 7, marginRight: 7}} />}
              activeDot={<View style={{backgroundColor: '#fff', width: 13, height: 13, borderRadius: 7, marginLeft: 7, marginRight: 7}} />}>
              {userSliderImages.map((images, key) => {
                return (
                  <View key={key} style={{flex: 1, justifyContent: 'center', alignItems: 'center',}}>
                    <Image source={{uri: images}} style={styles.imageSliderStyle} resizeMode="cover" />
                  </View>
                )
              })}
            </Swiper>
            {/* GridView Section*/}
          <ScrollView>
            <ListView
              initialListSize={20}
              contentContainerStyle={styles.grid}
              dataSource={gridDataSource}
              renderRow={this.renderGridView}
            />
          </ScrollView>
      </View>
    );
  }
}

const ds = new ListView.DataSource({
  rowHasChanged: (r1, r2) => r1 !== r2
});

mapDispatchToProps = (dispatch) => {
    return {
      getUserProfileData: bindActionCreators(getUserProfileData, dispatch),
      getUserSliderImages: bindActionCreators(getUserSliderImages, dispatch),
      getGridImages: bindActionCreators(getGridImages, dispatch)
    }
  }

  mapStateToProps = (state) => {    
    return {
      userProfileData: state.userProfileData,
      userSliderImages: state.userSliderImages,
      gridDataSource: ds.cloneWithRows(state.gridDataSource),
    }
  }

const styles = StyleSheet.create({
  container: {
    flex: 1    
  },
  cardView: {        
    borderBottomWidth: 1,
    borderColor: '#ddd',   
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 10,
    alignItems: 'center'    
  },  
  profileImage: {    
    width: 100,
    height: 100,    
    borderRadius: 50,     
  },
  cardBody: {
    flex: 1,       
    padding: 20,   
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  sliderContainer: {    
   marginTop: 5,
   padding: 20
  },
  imageSliderStyle: {   
    width: 400,
    height: 400,
  },
  grid: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap'    
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(App)