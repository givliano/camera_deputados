import Image from 'next/image';
import styles from './profile.module.css'

export default function Profile(props) {
  return (
    <div className={styles.profile}>
      <Image
        src={props.urlFoto}
        alt="Foto do deputado"
        className={styles.profilePicture}
        width={130}
        height={130}
      />
      <h2>{props.nome}</h2>
      <h3>{props.siglaPartido}</h3>
      <h3>{props.siglaUf}</h3>
    </div>
  )
}
