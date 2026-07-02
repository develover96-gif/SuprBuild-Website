import { LayoutGrid, RefreshCw, Shield, Database, Globe, Activity, Network, HardDrive, Cpu, Terminal } from 'lucide-react';
import { motion } from 'motion/react';
import { infraData } from '../data';

const iconMap: { [key: string]: any } = {
  LayoutGrid: LayoutGrid,
  RefreshCw: RefreshCw,
  Shield: Shield,
  Database: Database,
  Globe: Globe,
  Activity: Activity
};

export default function InfrastructurePage() {
  return (
    <div className="flex-1 bg-background text-foreground transition-colors duration-200">
      {/* Page Header */}
      <section className="pt-24 pb-16 md:py-28 border-b border-border bg-card">
        <div className="max-w-[1180px] mx-auto px-6 md:px-8">
          <div className="max-w-[800px]">
            <span className="inline-flex items-center gap-1.5 font-mono text-[11px] font-medium tracking-wider uppercase border border-border bg-secondary text-secondary-foreground px-2 py-0.5 select-none">
              <span className="w-1.5 h-1.5 rounded-full bg-primary" />
              Devops & Cloud Engineering
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-foreground mt-4 mb-6 leading-[1.05]">
              Hardened, self-healing<br />cloud architecture.
            </h1>
            <p className="text-muted-foreground text-[15px] sm:text-[17px] leading-relaxed max-w-[640px]">
              We design and provision infrastructure alongside code. No manual deployments, no fragile VM setups, and no server configuration drift.
            </p>
          </div>
        </div>
      </section>

      {/* Stack Diagram Visualizer */}
      <section className="py-16 md:py-20 border-b border-border">
        <div className="max-w-[1180px] mx-auto px-6 md:px-8">
          <div className="mb-12">
            <span className="font-mono text-[10.5px] uppercase tracking-widest text-primary font-bold">Standard Architecture Blueprint</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground mt-2">Zero-Trust High-Availability Setup</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-stretch relative">
            {[
              {
                step: '01',
                title: 'Global Edge Proxy',
                tech: 'Cloudflare CDN & WAF',
                desc: 'Edge caching, SSL decryption, DDoS mitigation, and firewall routing near the client.',
                icon: Globe
              },
              {
                step: '02',
                title: 'Orchestration Cluster',
                tech: 'Kubernetes (GKE/EKS) / ECS',
                desc: 'Self-healing containers with automated horizontal scaling and multi-zone failovers.',
                icon: Cpu
              },
              {
                step: '03',
                title: 'Isolated Private App',
                tech: 'Docker & Node / Python',
                desc: 'Highly secured microservices running strictly inside VPC isolated networking subnets.',
                icon: HardDrive
              },
              {
                step: '04',
                title: 'Durable Data Sync',
                tech: 'Postgres PITR / Redis',
                desc: 'Managed databases with connection pooling, automated backups, and encrypted volumes.',
                icon: Database
              }
            ].map((node, idx) => {
              const NodeIcon = node.icon;
              return (
                <div key={node.step} className="border border-border bg-card p-6 flex flex-col justify-between relative group hover:border-primary transition-all">
                  <div>
                    <div className="flex justify-between items-start mb-6">
                      <span className="font-mono text-xs font-bold text-muted-foreground">{node.step} // HUB</span>
                      <div className="w-[32px] h-[32px] border border-border flex items-center justify-center text-primary bg-background">
                        <NodeIcon className="w-4 h-4" />
                      </div>
                    </div>
                    <h3 className="font-extrabold text-[15px] text-foreground mb-1">{node.title}</h3>
                    <div className="font-mono text-[10.5px] text-primary mb-3 font-semibold">{node.tech}</div>
                    <p className="text-muted-foreground text-[12.5px] leading-relaxed">{node.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Detailed bento grid */}
      <section className="py-20 md:py-24 border-b border-border bg-card">
        <div className="max-w-[1180px] mx-auto px-6 md:px-8">
          <div className="max-w-[600px] mb-16">
            <span className="inline-flex items-center gap-1.5 font-mono text-[11px] font-medium tracking-wider uppercase border border-border bg-background text-foreground px-2 py-0.5 select-none">
              Specs
            </span>
            <h2 className="text-3xl font-extrabold tracking-tight text-foreground mt-4">
              Production-ready by default
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 border border-border bg-background divide-y md:divide-y-0 md:divide-x divide-border overflow-hidden">
            {infraData.map((item, idx) => {
              const IconComp = iconMap[item.iconName] || Database;
              return (
                <div key={item.title} className="p-8 flex flex-col gap-4 hover:bg-accent/40 transition-colors">
                  <div className="w-9 h-9 border border-border flex items-center justify-center text-primary bg-card">
                    <IconComp className="w-4.5 h-4.5" />
                  </div>
                  <div>
                    <h3 className="text-[15.5px] font-bold text-foreground mb-2">{item.title}</h3>
                    <p className="text-muted-foreground text-[13px] leading-relaxed">{item.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Zero configuration details */}
      <section className="py-20 md:py-24">
        <div className="max-w-[1180px] mx-auto px-6 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6">
              <h2 className="text-3xl font-extrabold text-foreground mb-4">Continuous delivery that doesn't sleep</h2>
              <p className="text-muted-foreground text-[14px] leading-relaxed mb-6">
                Every code repository we deliver is backed by modular infrastructure scripts (Terraform & YAML) and continuous deployment workflows. When you push to the <code className="font-mono text-xs bg-secondary text-foreground px-1.5 py-0.5 border border-border">main</code> branch, standard unit tests run, container images build securely, and the live application updates automatically within seconds.
              </p>
              <div className="flex gap-4">
                <div className="p-4 border border-border bg-card flex-1">
                  <span className="font-mono text-[11px] text-primary uppercase font-bold">Uptime SLA</span>
                  <div className="text-2xl font-extrabold text-foreground mt-1">99.95%</div>
                </div>
                <div className="p-4 border border-border bg-card flex-1">
                  <span className="font-mono text-[11px] text-primary uppercase font-bold">RTO Goal</span>
                  <div className="text-2xl font-extrabold text-foreground mt-1">&lt; 15 mins</div>
                </div>
              </div>
            </div>
            <div className="lg:col-span-6 bg-card border border-border p-6 font-mono text-[11.5px] text-foreground select-none">
              <div className="flex gap-1.5 items-center pb-4 border-b border-border mb-4">
                <Terminal className="w-4 h-4 text-primary" />
                <span className="font-bold">suprbuild-deployment.yaml</span>
              </div>
              <pre className="overflow-x-auto leading-relaxed text-muted-foreground">
{`apiVersion: apps/v1
kind: Deployment
metadata:
  name: suprbuild-product-service
  labels:
    app: api-gateway
spec:
  replicas: 3
  selector:
    matchLabels:
      app: api-gateway
  template:
    metadata:
      labels:
        app: api-gateway
    spec:
      containers:
      - name: api-server
        image: gcr.io/suprbuild/server:v2.1.0
        ports:
        - containerPort: 3000
        resources:
          limits:
            cpu: "1"
            memory: 1024Mi
          requests:
            cpu: "250m"
            memory: 512Mi
        livenessProbe:
          httpGet:
            path: /api/health
            port: 3000
          initialDelaySeconds: 15`}
              </pre>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
