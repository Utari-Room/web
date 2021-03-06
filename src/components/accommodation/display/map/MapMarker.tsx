import { Marker } from '@react-google-maps/api';
import * as React from 'react';
import { AccommodationType } from 'utari-common';

const MapMarker = ({
    change,
    latitude,
    longitude,
    rental,
    id,
    link,
}: Readonly<{
    latitude: number;
    longitude: number;
    rental: number;
    change: boolean;
    id: number;
    link: AccommodationType;
}>) => {
    const [state, setState] = React.useState({
        change: false,
    });

    const { change: stateChange } = state;

    const setChange = (change: boolean) =>
        setState((prev) => ({
            ...prev,
            change,
        }));

    return (
        <Marker
            position={{
                lat: latitude,
                lng: longitude,
            }}
            onMouseOver={() => setChange(true)}
            onMouseOut={() => setChange(false)}
            onClick={() => {
                const a = document.createElement('a');
                a.target = '_blank';
                a.href = `/detailed-${link.toLowerCase()}?id=${id}`;
                a.rel = 'nofollow noopener noreferrer';
                a.click();
            }}
            label={{
                text: `RM ${rental}`,
                color: 'white',
                fontWeight: 'bold',
                className: `label label-${
                    change || stateChange ? 'transformed' : 'untransformed'
                }`,
            }}
            zIndex={change || stateChange ? 99999 : undefined}
            onLoad={(marker) => {
                marker.setIcon({
                    path: 'M10.453 14.016l6.563-6.609-1.406-1.406-5.156 5.203-2.063-2.109-1.406 1.406zM12 2.016q2.906 0 4.945 2.039t2.039 4.945q0 1.453-0.727 3.328t-1.758 3.516-2.039 3.070-1.711 2.273l-0.75 0.797q-0.281-0.328-0.75-0.867t-1.688-2.156-2.133-3.141-1.664-3.445-0.75-3.375q0-2.906 2.039-4.945t4.945-2.039z',
                    fillColor: 'black',
                    fillOpacity: 1,
                    strokeWeight: 1,
                    scale: 1,
                });
                return marker;
            }}
        />
    );
};

const DefaultMapMarker = ({
    latitude,
    longitude,
}: Readonly<{
    latitude: number;
    longitude: number;
}>) => (
    <Marker
        position={{
            lat: latitude,
            lng: longitude,
        }}
    />
);

export { MapMarker, DefaultMapMarker };
