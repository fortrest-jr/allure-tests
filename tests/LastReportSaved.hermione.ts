import { HermioneCtx } from 'types';
import { FixturesPackName } from 'types/fixtures';
import { UserRole } from 'types/base';
import { DefaultStatisticsPage } from 'products/Statistics/StatisticsPage';
import { StatisticsPage } from 'products/Statistics/types';
import { MockHelper } from 'helpers/MockHelper';
import { MockService } from 'types/mocks';

describe('Статистика', () => {
    type Context = HermioneCtx & {
        mocks: MockService;
        statistics: StatisticsPage;
    };

    beforeEach(async function (this: Context) {
        this.statistics = new DefaultStatisticsPage(
            this.browser,
            'custom_report_by_mobile_mediation',
            {
                fixturesPack: FixturesPackName.contextRtbBlock,
                role: UserRole.PARTNER,
            },
        );

        this.mocks = MockHelper.create();

        // подготовка тестовой среды для теста: наливка фикстур и авторизация тестовым пользователем
        await this.statistics.prepareTestPlatform();

        // Основной мок данных отчета
        await this.mocks.add('custom_report_by_mobile_mediation_full');
    });

    afterEach(async function (this: Context) {
        await this.mocks.remove('custom_report_by_mobile_mediation_full');
        await this.browser.clearLocalStorageItems();
    });

    it('Проверка сохранения последнего отчета', async function (this: Context) {
        await this.browser.step(this.currentTest.id(), 'Открыли страницу конструктора отчетов', async () => {
            await this.statistics.load();
        });

        await this.browser.step(this.currentTest.id(), 'Скрыть обучающую презентацию', async () => {
            await this.statistics.onboarding.skip();
        });

        await this.browser.step(this.currentTest.id(), 'Сохранить новый отчет Мобильной медиации', async () => {
            await this.statistics.reportList.ready();
            await this.statistics.report.changeReportType('Мобильная медиация');
            await this.statistics.reportList.openSavedReports();
            await this.statistics.reportList.ready();
            await this.statistics.report.period.choosePreset('Вчера');
            await this.statistics.report.settings.expand();
            await this.statistics.report.settings.toggleGroups();
            await this.statistics.report.groups.toggleItem('По дням');
            await this.statistics.report.groups.toggleItem('Монетизатор');
            await this.statistics.report.groups.apply();
            await this.statistics.report.settings.toggleMetrics();
            await this.statistics.report.metrics.toggleItem('Запросы');
            await this.statistics.report.metrics.toggleItem('Показы');
            await this.statistics.report.metrics.toggleItem('Show rate');
            await this.statistics.report.metrics.toggleItem('Расчетный доход');
            await this.statistics.report.metrics.apply();
            await this.statistics.report.saveAsReport('Новый Отчет');
        });

        await this.browser.step(this.currentTest.id(), 'Новый отчет сохранен', async () => {
            await this.statistics.assertView('new_report_saved');
        });

        await this.browser.step(this.currentTest.id(), 'Добавить новую группировку отчета, построить отчет', async () => {
            await this.statistics.report.settings.toggleGroups();
            await this.statistics.report.groups.toggleItem('По городам');
            await this.statistics.report.groups.apply();
            await this.statistics.report.create();
            await this.statistics.report.ready();
        });
        
        await this.browser.refresh();
        //await this.browser.acceptAlert();
        await this.statistics.report.ready();
        
        await this.browser.step(this.currentTest.id(), 'Обновить страницу', async () => {
            //методы выше вынесены за пределы степа для получения исключения
        });

        await this.browser.step(this.currentTest.id(), 'На странице остается построенный отчет с добавленной группировкой', async () => {
            await this.statistics.assertView('saved_report_with_added_group_built');
        });

        await this.browser.step(this.currentTest.id(), 'Выбрать сохраненный отчет, перейти на страницу дашборда и обратно', async () => {
            await this.statistics.goToDashboardPage();
            await this.statistics.goToStatisticsPage();
            await this.statistics.report.changeReportType('Мобильная медиация');
            await this.statistics.reportList.openSavedReports();
            await this.statistics.reportList.ready();
            await this.statistics.reportList.selectReport('Новый Отчет');
            await this.statistics.goToDashboardPage();
            await this.statistics.goToStatisticsPage();
            await this.statistics.reportList.ready();
        });

        await this.browser.step(this.currentTest.id(), 'Открыт последний выбранный сохраненный отчет '
        + 'без добавленной группировки, построенный отчет отсутствует', async () => {
            await this.statistics.assertView('last_saved_report_open');
        });

        await this.browser.step(this.currentTest.id(), 'Открыть шаблон отчета', async () => {
            await this.statistics.reportList.openStandartReports();
            await this.statistics.reportList.ready();
            await this.statistics.reportList.selectReport('По приложениям');
        });

        await this.browser.step(this.currentTest.id(), 'Открыт шаблон отчета', async () => {
            await this.statistics.assertView('report_template_open');
        });

        await this.browser.step(this.currentTest.id(), 'Добавить новую группировку отчета, построить отчет', async () => {
            await this.statistics.report.settings.toggleGroups();
            await this.statistics.report.groups.toggleItem('По городам');
            await this.statistics.report.groups.apply();
            await this.statistics.report.create();
            await this.statistics.report.ready();
        });

        await this.browser.step(this.currentTest.id(), 'Обновить страницу', async () => {
            await this.browser.refresh();
            await this.statistics.report.ready();
        });

        await this.browser.step(this.currentTest.id(), 'На странице остается построенный отчет с добавленной группировкой', async () => {
            await this.statistics.assertView('report_template_with_added_group_built');
        });

        await this.browser.step(this.currentTest.id(), 'Перейти на страницу дашборда и обратно', async () => {
            await this.statistics.goToDashboardPage();
            await this.statistics.goToStatisticsPage();
            await this.statistics.reportList.ready();
        });

        await this.browser.step(this.currentTest.id(), 'Открыт последний выбранный шаблон отчета '
            + 'без добавленной группировки, построенный отчет отсутствует', async () => {
            await this.statistics.assertView('last_report_template_open');
        });
    });
});

