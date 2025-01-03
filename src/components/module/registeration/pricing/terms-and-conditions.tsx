import { getFormattedDate } from "@/lib/utils/dateUtils";

export function TermsAndConditions() {
	return (
		<div className="space-y-4">
			<h2 className="text-xl font-bold">
				Terms and Conditions for Member Services Payment
			</h2>
			<p>Effective Date: {getFormattedDate()}</p>
			<h3 className="text-lg font-semibold">Welcome to Tilla Health</h3>
			<p>
				Thank you for choosing Tilla Health. Please carefully review the
				following terms and conditions before making payment for our services.
				By proceeding with payment and clicking the checkbox to confirm your
				agreement, you acknowledge that you have read, understood, and agreed to
				these terms.
			</p>
			<h4 className="text-md font-semibold">1. Payment Terms</h4>
			<h5 className="font-semibold">1.1 Payment Methods</h5>
			<p>
				We accept payments via credit/debit cards, bank transfers, mobile
				payments, and other approved methods. Payments must be made in the
				currency specified in the invoice or on our platform.
			</p>
			<h5 className="font-semibold">1.2 Payment Due Date</h5>
			<p>
				Payments are due upon receipt of the invoice. For members on a monthly
				payment cycle, the payment date will recur on the same day each month.
				For annual payments, the next payment will be due on the same date in
				the following year.
			</p>
			<h5 className="font-semibold">1.3 Recurring Payments</h5>
			<p>
				For subscription-based services, payments will recur monthly or annually
				based on the member&apos;s chosen payment cycle unless canceled in
				accordance with Section 3.2.
			</p>
			<h4 className="text-md font-semibold">2. Services Provided</h4>
			<h5 className="font-semibold">2.1 Scope of Services</h5>
			<p>
				Upon payment, you will gain access to the services outlined in your
				selected plan, as described in our Member Agreement and on our website.
				Benefits will commence on the same date in the following month after the
				initial payment.
			</p>
			<h5 className="font-semibold">2.2 Changes to Services</h5>
			<p>
				Tilla Health reserves the right to modify, suspend, or discontinue any
				service with prior notice.
			</p>
			<h4 className="text-md font-semibold">
				3. Refund and Cancellation Policy
			</h4>
			<h5 className="font-semibold">3.1 Refunds</h5>
			<p>
				Payments are non-refundable unless explicitly stated otherwise.
				Exceptions may be made for billing errors or service delivery issues.
			</p>
			<h5 className="font-semibold">3.2 Cancellation</h5>
			<p>
				You may cancel your service subscription at any time by contacting our
				support team. Cancellation will take effect at the end of the current
				billing cycle.
			</p>
			<h4 className="text-md font-semibold">4. Member Responsibilities</h4>
			<h5 className="font-semibold">4.1 Accurate Information</h5>
			<p>
				You are responsible for providing accurate and up-to-date payment and
				contact information.
			</p>
			<h5 className="font-semibold">4.2 Compliance with Policies</h5>
			<p>Members must comply with all Tilla Health policies and guidelines.</p>
			<h4 className="text-md font-semibold">5. Termination of Services</h4>
			<p>
				Tilla Health reserves the right to terminate services for non-payment,
				violation of these terms, or other reasons as specified in the Member
				Agreement.
			</p>
			<h4 className="text-md font-semibold">6. Data Privacy</h4>
			<p>
				Tilla Health is committed to protecting your personal information.
				Please refer to our Privacy Policy for details on how we collect, use,
				and safeguard your data.
			</p>
			<h4 className="text-md font-semibold">7. Dispute Resolution</h4>
			<p>
				In the event of a payment dispute, you agree to notify Tilla Health
				promptly and allow us an opportunity to resolve the issue before seeking
				third-party mediation or legal action.
			</p>
			<h4 className="text-md font-semibold">8. Contact Information</h4>
			<p>For payment inquiries or concerns, please contact us:</p>
			<ul className="list-disc pl-6">
				<li>Email: support@tillahealth.com</li>
				<li>Phone: 0968658292</li>
				<li>Address: Bole Road, B-Block 2 Floor, Addis Ababa, Ethiopia</li>
			</ul>
		</div>
	);
}
