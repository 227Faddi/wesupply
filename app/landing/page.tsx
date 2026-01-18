import Link from 'next/link';
import styles from './landing.module.css';

export default function LandingPage() {
  return (
    <main className={styles.landingContainer}>
      <div className={styles.centeredContent}>
        <h1 className={styles.title}>WeSupply</h1>
        <p className={styles.subtitle}>Simplifiez vos courses et votre budget alimentaire.</p>
        <Link href="/onboarding" className={styles.ctaButton}>
          Get Started
        </Link>
      </div>
    </main>
  );
}
