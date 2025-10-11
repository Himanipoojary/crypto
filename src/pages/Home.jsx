import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/common/Button';
import styles from './Home.module.css';

const Home = () => {
  const features = [
    {
      icon: '🎯',
      title: 'Interactive Demo',
      description: 'Try real-time dictionary attacks against MD5, SHA-1, and SHA-256 hashes',
      link: '/demo'
    },
    {
      icon: '📚',
      title: 'Learn Theory',
      description: 'Understand how hash algorithms work and why some are vulnerable',
      link: '/theory'
    },
    {
      icon: '🛡️',
      title: 'Prevention Guide',
      description: 'Discover best practices to protect against dictionary attacks',
      link: '/prevention'
    }
  ];

  const stats = [
    { number: '200B+', label: 'MD5 hashes/sec', icon: '⚡' },
    { number: '< 1s', label: 'Weak password crack time', icon: '⏱️' },
    { number: '53%', label: 'Users with weak passwords', icon: '⚠️' },
    { number: '100%', label: 'Educational purpose', icon: '🎓' }
  ];

  return (
    <div className={styles.container}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <span className={styles.badge}>Educational Security Demo</span>
          <h1 className={styles.heroTitle}>
            Understand Dictionary Attacks
            <span className={styles.gradient}> Against Weak Hashes</span>
          </h1>
          <p className={styles.heroDescription}>
            An interactive educational platform demonstrating how dictionary attacks exploit 
            weak cryptographic hash functions. Learn cybersecurity concepts through hands-on experience.
          </p>
          <div className={styles.heroActions}>
            <Link to="/demo">
              <Button variant="primary" size="large" icon="🚀">
                Try Live Demo
              </Button>
            </Link>
            <Link to="/theory">
              <Button variant="outline" size="large" icon="📖">
                Learn How It Works
              </Button>
            </Link>
          </div>
        </div>
        
        <div className={styles.heroImage}>
          <div className={styles.hashAnimation}>
            <div className={styles.hashBox}>
              <span className={styles.hashLabel}>Input</span>
              <code>password123</code>
            </div>
            <div className={styles.arrow}>→</div>
            <div className={styles.hashBox}>
              <span className={styles.hashLabel}>MD5 Hash</span>
              <code>482c811da5d5b4bc6d497ffa98491e38</code>
            </div>
            <div className={styles.arrow}>→</div>
            <div className={styles.hashBox}>
              <span className={styles.hashLabel}>Cracked!</span>
              <code className={styles.cracked}>password123</code>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className={styles.statsSection}>
        <div className={styles.statsGrid}>
          {stats.map((stat, index) => (
            <div key={index} className={styles.statCard}>
              <span className={styles.statIcon}>{stat.icon}</span>
              <h3 className={styles.statNumber}>{stat.number}</h3>
              <p className={styles.statLabel}>{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className={styles.featuresSection}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>What You'll Learn</h2>
          <p className={styles.sectionSubtitle}>
            Explore the fundamentals of cryptographic security through interactive demonstrations
          </p>
        </div>
        
        <div className={styles.featuresGrid}>
          {features.map((feature, index) => (
            <Link key={index} to={feature.link} className={styles.featureCard}>
              <div className={styles.featureIcon}>{feature.icon}</div>
              <h3 className={styles.featureTitle}>{feature.title}</h3>
              <p className={styles.featureDescription}>{feature.description}</p>
              <span className={styles.featureLink}>
                Explore → 
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Warning Section */}
      <section className={styles.warningSection}>
        <div className={styles.warningCard}>
          <div className={styles.warningIcon}>⚠️</div>
          <div className={styles.warningContent}>
            <h3 className={styles.warningTitle}>Educational Use Only</h3>
            <p className={styles.warningText}>
              This tool is designed for educational purposes to demonstrate cybersecurity concepts. 
              Unauthorized access to computer systems is illegal. Always use ethical hacking principles 
              and obtain proper authorization before testing any security measures.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={styles.ctaSection}>
        <div className={styles.ctaContent}>
          <h2 className={styles.ctaTitle}>Ready to Get Started?</h2>
          <p className={styles.ctaDescription}>
            Try the interactive demo and see how quickly weak passwords can be cracked
          </p>
          <Link to="/demo">
            <Button variant="success" size="large" icon="🎯">
              Launch Demo Now
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
