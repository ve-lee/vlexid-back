import { ConfigService } from '@nestjs/config';

export default function (config: ConfigService) {
  return {
    pinoHttp: {
      // customProps: (req, res) => ({
      //   context: config.get('NODE_ENV'),
      // }),
      transport: {
        targets: [
          {
            target: 'pino-pretty',
            options:
              process.env.NODE_ENV === 'development'
                ? {
                    colorize: true,
                    levelFirst: true,
                    // singleLine: true,
                    translateTime: 'SYS:standard',
                  }
                : {},
            level: config.get('LOG_LEVEL') || 'debug',
          },
          {
            target: 'pino/file',
            options: {
              destination: config.get('LOG_FILE') || '/var/log/vlexid.txt',
            },
            level: 'debug',
          },
          //   {
          //     target: 'pino-elasticsearch',
          //     options: {
          //       node: config.get('ELASTIC_URL') || 'http://elasticsearch:9200',
          //     },
          //     level: config.get('LOG_LEVEL') || 'debug',
          //   },
        ],
      },
    },
  };
}
