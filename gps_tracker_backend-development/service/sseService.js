const { Subject } = require('rxjs');
const { filter, map } = require('rxjs/operators');

// const subject = new Subject < models.gpsDeviceTrack > ();
const subject = new Subject();

const publish = (data) => {
    //console.log('Publicando evento SSE desde seeService:', data);
    subject.next(data);
};

const getPositions  = () => {
    //console.log('getPositions: ', getPositions );
    return subject.pipe(
        filter((data) => data != null),
        map((track) => {
            return { data: track, name: 'message' };
        }),
    );
}

module.exports = {
    publish,
    getPositions
}