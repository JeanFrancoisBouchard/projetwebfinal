import React from 'react';
import ReactMapBoxGl , {Layer, Feature} from 'react-mapbox-gl';
import icon from '../About/location.png';

const Map = ReactMapBoxGl({
    accessToken : "pk.eyJ1IjoiYWxleGthcmV2IiwiYSI6ImNqcGRkZThqZDAzaWczbG9hbjJ4bGNkdHYifQ.VJLuybltka8dmAFqPYJT8w"
});

const image = new Image(30,30);
image.src = icon;
const images = ['myImage', image]

class Maps extends React.Component{
    render(){
        return(
            <Map
                style="mapbox://styles/mapbox/streets-v9"
                containerStyle={{
                height: 600,
                width: 900
                }}
                center={[-71.159583,46.809405]}
                >
                <Layer
                    type="symbol"
                    id="marker"
                    layout={{ "icon-image": 'myImage', 'icon-allow-overlap': true }}
                    images={images}
                    >
                    <Feature coordinates={[-71.159583, 46.809405]}/>
                </Layer>
            </Map>
        );
    }
}

export default Maps;