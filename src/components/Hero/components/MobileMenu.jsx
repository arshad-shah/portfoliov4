import { Dialog, DialogPanel } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import PropTypes from 'prop-types';
function MobileMenu({ isOpen, onClose, navigation }) {
	return (
		<Dialog className="lg:hidden" open={isOpen} onClose={onClose}>
			<div className="fixed inset-0 z-50" />
			<DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
				<div className="flex items-center justify-end">
					<button
						type="button"
						className="-m-2.5 rounded-md p-2.5 text-gray-700"
						onClick={onClose}
					>
						<span className="sr-only">Close menu</span>
						<XMarkIcon className="h-6 w-6" aria-hidden="true" />
					</button>
				</div>
				<div className="mt-6 flow-root">
					<div className="-my-6 divide-y divide-gray-500/10">
						<div className="space-y-2 py-6">
							{navigation.map((item) => (
								<a
									key={`${item.label}-${item.link}`}
									href={item.href}
									className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
								>
									{item.label}
								</a>
							))}
						</div>
					</div>
				</div>
			</DialogPanel>
		</Dialog>
	);
}

MobileMenu.propTypes = {
	isOpen: PropTypes.bool,
	onClose: PropTypes.func,
	navigation: PropTypes.arrayOf(
		PropTypes.shape({
			name: PropTypes.string,
			href: PropTypes.string,
		}),
	),
};

export default MobileMenu;
