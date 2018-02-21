import Kitten from '../models/kitten';
import cuid from 'cuid';

export default function () {
  Kitten.count().exec((err, count) => {
    if (count > 0) {
      return;
    }

    const kitten1 = new Kitten({ name: 'Sparkle', cuid: cuid() });
    const kitten2 = new Kitten({ name: 'Spot', cuid: cuid() });

    Kitten.create([kitten1, kitten2], (error) => {
      if (!error) {
        // console.log('ready to go....');
      }
    });
  });
}
