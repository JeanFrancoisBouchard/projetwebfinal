import React from 'react';
import ReactMapBoxGl , {Layer, Feature} from 'react-mapbox-gl';

const Map = ReactMapBoxGl({
    accessToken : "pk.eyJ1IjoiYWxleGthcmV2IiwiYSI6ImNqcGRkZThqZDAzaWczbG9hbjJ4bGNkdHYifQ.VJLuybltka8dmAFqPYJT8w"
});

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
                    layout={{ "icon-image": "marker-15" }}>
                    <Feature coordinates={[-71.159583, 46.809405]}/>
                </Layer>
            </Map>
        );
    }
}

export default Maps;