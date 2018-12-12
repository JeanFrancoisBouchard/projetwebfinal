import React from 'react';
import ReactMapBoxGl , {Layer, Feature, Popup} from 'react-mapbox-gl';
import icon from '../About/location.png';

const Map = ReactMapBoxGl({
    accessToken : "pk.eyJ1IjoiYWxleGthcmV2IiwiYSI6ImNqcGRkZThqZDAzaWczbG9hbjJ4bGNkdHYifQ.VJLuybltka8dmAFqPYJT8w"
});

const image = new Image(30,30);
image.src = icon;
const images = ['myImage', image]


class Maps extends React.Component{
    constructor(props){
        super(props);

        this.isVisible = this.isVisible.bind(this);

        this.state = {
            visible : true,
            style : {visibility : "visible"}
        }
    }

    isVisible() {
        if(this.state.visible === false){
            this.setState({
                visible : true,
                style : {visibility : "visible"}
            });
        }
        else{
            this.setState({
                visible : false,
                style : { visibility : "hidden"}
            });
        }
    }

    render(){

        return(
            <Map
                style={"mapbox://styles/mapbox/streets-v9"}
                containerStyle={{
                height: 600,
                width: 600,
                zoom: 11.15
                }}
                center={[-71.159583,46.809405]}
                >
                <Layer
                    type="symbol"
                    id="marker"
                    layout={{ "icon-image": 'myImage', 
                        'icon-allow-overlap': true 
                    }}
                    images={images}
                    >
                    <Feature coordinates={[-71.159583, 46.809405]}/>
                </Layer>
                <Popup
                    key="station" 
                    coordinates={[-71.159583, 46.809405]}
                    style={this.state.style}
                    onClick={this.isVisible}
                >
                    <div>
                        <strong>Ciné du 6863</strong>
                        <p>
                            6863 rue Alfred-Pellan
                            Lévis, Qc G6V 8X7
                            46.809416, -71.159606
                        </p>
                    </div>
                </Popup>
            </Map>
        );
    }
}

export default Maps;