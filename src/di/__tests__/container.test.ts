import { container } from '../container';

describe('ServiceLocator container', () => {
  beforeEach(() => {
    container.resetForTests();
  });

  it('resolves use cases after init', async () => {
    await container.init();
    expect(container.getGetUpcomingClassesUseCase()).toBeDefined();
    expect(container.getBookClassUseCase()).toBeDefined();
    expect(container.getCancelBookingUseCase()).toBeDefined();
    expect(container.getGetMemberBookingsUseCase()).toBeDefined();
  });
});
