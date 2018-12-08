import React from 'react';
import ReactMapGL from 'react-map-gl';

class Map extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            viewport : {
                width : 900,
                height: 600,
                latitude : 46.809405,
                longitude : -71.159583,
                zoom : 8
            }
        };
    }

    render() {
        var TOKEN = "pk.eyJ1IjoiYWxleGthcmV2IiwiYSI6ImNqcGRkZThqZDAzaWczbG9hbjJ4bGNkdHYifQ.VJLuybltka8dmAFqPYJT8w";
        return(
            <div style={{display: 'flex', justifyContent: 'center'}}>
                <ReactMapGL
                    style={{position : 'relative'}}
                    {...this.state.viewport}
                    mapboxApiAccessToken={TOKEN}
                    onViewportChange={(viewport) => this.setState({viewport})}
                />
            </div>
        );
    }
}

export default Map;