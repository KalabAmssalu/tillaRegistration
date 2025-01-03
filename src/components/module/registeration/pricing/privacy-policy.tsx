import { getFormattedDate } from "@/lib/utils/dateUtils";

export function PrivacyPolicy() {
	return (
		<div className="space-y-4">
			<h2 className="text-xl font-bold">Privacy Policy: Data Privacy</h2>
			<p>Effective Date: {getFormattedDate()}</p>
			<p>
				At Tilla Health, your privacy is our priority. This Privacy Policy
				explains how we collect, use, store, and protect your personal
				information in connection with our services. By using Tilla Health
				services, you agree to the practices described in this policy.
			</p>
			<h4 className="text-md font-semibold">1. Information We Collect</h4>
			<p>
				We collect the following types of information to provide and improve our
				services:
			</p>
			<ul className="list-disc pl-6">
				<li>
					Personal Information: Name, contact details, date of birth, address,
					payment information, and identification numbers (if applicable).
				</li>
				<li>
					Health Information: Data related to your health plan enrollment,
					claims, and medical history, as required to deliver our services.
				</li>
				<li>
					Technical Information: Device information, IP address, and browsing
					behavior for security and service optimization purposes.
				</li>
			</ul>
			<h4 className="text-md font-semibold">2. How We Use Your Information</h4>
			<p>Tilla Health uses your data to:</p>
			<ul className="list-disc pl-6">
				<li>Provide and manage your health plan services.</li>
				<li>Process payments and manage billing.</li>
				<li>Improve service delivery and user experience.</li>
				<li>Comply with legal and regulatory requirements.</li>
				<li>
					Communicate with you about updates, promotions, and new services (with
					your consent).
				</li>
			</ul>
			<h4 className="text-md font-semibold">3. Data Sharing</h4>
			<p>
				We do not sell your personal data. However, we may share your
				information in the following circumstances:
			</p>
			<ul className="list-disc pl-6">
				<li>
					With Service Providers: Third-party vendors who assist in delivering
					services (e.g., payment processors, healthcare providers).
				</li>
				<li>
					For Legal Compliance: When required by law, court orders, or to
					protect our rights and interests.
				</li>
				<li>
					With Your Consent: For any additional purposes, upon your explicit
					approval.
				</li>
			</ul>
			<h4 className="text-md font-semibold">4. Data Security</h4>
			<p>
				Tilla Health implements advanced security measures to safeguard your
				personal information, including:
			</p>
			<ul className="list-disc pl-6">
				<li>Encrypted data transmission and storage.</li>
				<li>Access controls to restrict unauthorized use.</li>
				<li>Regular security assessments and updates.</li>
			</ul>
			<p>
				Despite our efforts, no system is completely secure. Please notify us
				immediately if you suspect unauthorized access to your account.
			</p>
			<h4 className="text-md font-semibold">5. Your Rights</h4>
			<p>You have the following rights regarding your data:</p>
			<ul className="list-disc pl-6">
				<li>
					Access: Request access to the personal information we hold about you.
				</li>
				<li>
					Correction: Request corrections to inaccurate or incomplete
					information.
				</li>
				<li>
					Deletion: Request deletion of your data, subject to applicable laws.
				</li>
				<li>
					Data Portability: Request a copy of your data in a usable format.
				</li>
				<li>
					Withdraw Consent: Revoke consent for specific data processing
					activities.
				</li>
			</ul>
			<p>
				To exercise these rights, contact us at [Insert Contact Information].
			</p>
			<h4 className="text-md font-semibold">6. Data Retention</h4>
			<p>
				We retain your information only as long as necessary to fulfill the
				purposes outlined in this policy or as required by law.
			</p>
			<h4 className="text-md font-semibold">7. Changes to This Policy</h4>
			<p>
				Tilla Health reserves the right to update this Privacy Policy to reflect
				changes in our practices or legal obligations. We will notify you of
				significant updates and encourage you to review the policy periodically.
			</p>
			<h4 className="text-md font-semibold">8. Contact Information</h4>
			<p>
				For questions or concerns regarding this Privacy Policy, please contact
				us:
			</p>
			<ul className="list-disc pl-6">
				<li>Email: support@tillahealth.com</li>
				<li>Phone: 0968658292</li>
				<li>Address: Bole Road, B-Block 2 Floor, Addis Ababa, Ethiopia</li>
			</ul>
		</div>
	);
}
