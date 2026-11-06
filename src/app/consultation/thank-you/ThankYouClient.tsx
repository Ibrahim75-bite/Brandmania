'use client';

import React from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { BrandEye } from '@/presentation/components/primitives/BrandEye';
import styles from './ThankYou.module.css';

export function ThankYouClient() {
  const searchParams = useSearchParams();
  const type = searchParams.get('type') || 'booked';
  const isCustomRequest = type === 'custom-request';

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <div className={styles.iconWrapper}>
          <BrandEye size="md" />
        </div>

        <div className={styles.badge}>
          {isCustomRequest ? 'Request Received' : 'Session Confirmed'}
        </div>

        <h1 className={styles.title}>
          {isCustomRequest
            ? 'Your Preferred Times Have Been Received'
            : 'Your Consultation Is Confirmed'}
        </h1>

        <p className={styles.subtitle}>
          {isCustomRequest
            ? 'We have recorded your custom scheduling request. Our senior advisory team will review your preferred time slots.'
            : 'We have reserved your 30-minute private working session. A calendar invite has been sent to your email.'}
        </p>

        <div className={styles.stepsList}>
          {isCustomRequest ? (
            <>
              <div className={styles.stepItem}>
                <span className={styles.stepNum}>1</span>
                <div className={styles.stepText}>
                  <span className={styles.stepTitle}>Availability Verification</span>
                  <span className={styles.stepDesc}>
                    Our team compares your 3 requested dates and times against executive partner availability.
                  </span>
                </div>
              </div>

              <div className={styles.stepItem}>
                <span className={styles.stepNum}>2</span>
                <div className={styles.stepText}>
                  <span className={styles.stepTitle}>Manual Calendar Invitation</span>
                  <span className={styles.stepDesc}>
                    You will receive a formal Google Meet or Zoom invite directly to your inbox within 12–24 business hours.
                  </span>
                </div>
              </div>

              <div className={styles.stepItem}>
                <span className={styles.stepNum}>3</span>
                <div className={styles.stepText}>
                  <span className={styles.stepTitle}>Review Materials Ahead of Call</span>
                  <span className={styles.stepDesc}>
                    Keep your custom review video and inbox checklist handy so we can dive straight into your findings.
                  </span>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className={styles.stepItem}>
                <span className={styles.stepNum}>1</span>
                <div className={styles.stepText}>
                  <span className={styles.stepTitle}>Check Your Inbox</span>
                  <span className={styles.stepDesc}>
                    Open the Cal.com confirmation email containing your direct Google Meet or Zoom link.
                  </span>
                </div>
              </div>

              <div className={styles.stepItem}>
                <span className={styles.stepNum}>2</span>
                <div className={styles.stepText}>
                  <span className={styles.stepTitle}>Have Your Teardown Video Ready</span>
                  <span className={styles.stepDesc}>
                    We will walk directly through the 2–3 conversion leaks flagged in your personalized video review.
                  </span>
                </div>
              </div>

              <div className={styles.stepItem}>
                <span className={styles.stepNum}>3</span>
                <div className={styles.stepText}>
                  <span className={styles.stepTitle}>Easy Rescheduling</span>
                  <span className={styles.stepDesc}>
                    If something urgent emerges, use the reschedule link inside your confirmation email at least 4 hours prior.
                  </span>
                </div>
              </div>
            </>
          )}
        </div>

        <Link href="/" className={styles.homeButton}>
          Return to BRANDMANIA Home &rarr;
        </Link>
      </div>
    </div>
  );
}

