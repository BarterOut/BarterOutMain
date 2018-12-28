import cuid from 'cuid';
import Kitten from '../models/kitten';

export default function () {
  Kitten.countDocuments().exec((err, count) => {
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
